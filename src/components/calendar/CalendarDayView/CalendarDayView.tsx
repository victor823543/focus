import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { CSSProperties, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCalendar } from "../../../hooks/useCalendar";
import useSelectSession from "../../../hooks/useSelectSession";
import { DayStatus, ListDaysReturn, UpdateDayParams } from "../../../types/Day";
import { callAPI } from "../../../utils/apiService";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import Loading from "../../common/Loading/Loading";
import StyledRangeInput from "../../common/RangeInput/StyledRangeInput";
import styles from "./CalendarDayView.module.css";

type CalendarDayViewProps = {
  days: ListDaysReturn;
};

const createDaySchema = yup.object().shape({
  session: yup.string().required(),
  date: yup.string().required(),
  categories: yup.array().of(
    yup.object().shape({
      category: yup.string().required(),
      score: yup.number().min(0).max(10).required().default(0),
    }),
  ),
});

export type CreateDayFormFields = yup.InferType<typeof createDaySchema>;

const CalendarDayView: React.FC<CalendarDayViewProps> = ({ days }) => {
  const queryClient = useQueryClient();
  const { currentDate, goToNextDay, goToPrevDay, getDateStatus } =
    useCalendar();
  const { currentSession } = useSelectSession();
  const [totalScore, setTotalScore] = useState(
    currentDate.toISOString() in days
      ? Math.round(days[currentDate.toISOString()].totalScore)
      : 0,
  );

  // Handle Date Status
  const [dateStatus, setDateStatus] = useState<DayStatus>(
    getDateStatus(currentDate, currentDate.toISOString() in days),
  );

  useEffect(
    () =>
      setDateStatus(
        getDateStatus(currentDate, currentDate.toISOString() in days),
      ),
    [currentDate],
  );

  // Handle Form
  const form = useForm<CreateDayFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(createDaySchema),
    defaultValues: {
      session: currentSession?.id,
      date: currentDate.toISOString(),
      categories:
        currentDate.toISOString() in days
          ? days[currentDate.toISOString()].score.map((category) => ({
              category: category.category,
              score: category.score,
            }))
          : [],
    },
  });

  // Handle create mutation
  const createDayMutation = useMutation({
    mutationFn: (params: CreateDayFormFields) =>
      callAPI(`/days/create`, "POST", params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["days", currentSession?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["session", currentSession?.id],
      });
    },
    onError: (err) => console.log(err.message),
  });

  // Handle update mutation
  const updateDayMutation = useMutation({
    mutationFn: (params: UpdateDayParams & { dayId: string }) =>
      callAPI(`/days/update/${params.dayId}`, "PUT", params.categoryScore),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["days", currentSession?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["session", currentSession?.id],
      });
    },
  });

  // Call correct mutation on submit
  const handleSubmit = (params: CreateDayFormFields) => {
    if (dateStatus === DayStatus.HasResult) {
      updateDayMutation.mutate({
        categoryScore: params.categories || [],
        dayId: days[currentDate.toISOString()].id,
      });
    } else {
      createDayMutation.mutate(params);
    }
  };

  // Update totalscore
  useEffect(() => {
    const subscription = form.watch((value) => {
      const currentCategories = value.categories;
      if (currentCategories) {
        setTotalScore(
          currentCategories.reduce(
            (total, category) => total + (category?.score || 0),
            0,
          ),
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  if (!currentSession) return <Loading />;

  return (
    <form
      key={currentDate.toISOString()}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className={styles.calendarDay}>
        {/* Navigation Header */}
        <header className={styles.header}>
          <div onClick={goToPrevDay} className={styles.arrowContainer}>
            <ChevronLeftIcon />
          </div>
          <div className={styles.dayText}>
            {currentDate.toLocaleDateString()}
          </div>
          <div onClick={goToNextDay} className={styles.arrowContainer}>
            <ChevronRightIcon />
          </div>
        </header>

        {/* Secondary header */}
        {![DayStatus.After, DayStatus.Before].includes(dateStatus) && (
          <div className={styles.secHeader}>
            <SecondaryHeaderContent
              status={dateStatus}
              totalScore={totalScore}
            />
          </div>
        )}

        {/* Main */}
        <main className={styles.day}>
          <div className={styles.grid}>
            {currentSession.categories.map((category, index) => {
              const startValue =
                currentDate.toISOString() in days
                  ? days[currentDate.toISOString()].score.find(
                      (categoryScore) => categoryScore.category === category.id,
                    )?.score
                  : 0;
              return (
                <div
                  key={category.id}
                  className={styles.categoryWrapper}
                  style={{ "--hex": category.color.hex } as CSSProperties}
                >
                  <div className={styles.category}>
                    <div className={styles.categoryName}>{category.name}</div>
                    <div className={styles.categoryImportance}>
                      <span>X - {category.importance}</span>
                    </div>
                  </div>

                  <div className={styles.categoryResult}>
                    <StyledRangeInput
                      form={form}
                      name={`categories.${index}.score`}
                      min={0}
                      max={10}
                      step={1}
                      fieldColor="var(--gray-light)"
                      thumbColor="var(--gray-mid)"
                      initialValue={startValue}
                    />
                    {/* Automatically set category field to category.id */}
                    <input
                      type="hidden"
                      {...form.register(`categories.${index}.category`)}
                      value={category.id} // Hidden input to store category id
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </form>
  );
};

const SecondaryHeaderContent = ({
  status,
  totalScore,
}: {
  status: DayStatus;
  totalScore: number;
}) => {
  switch (status) {
    case DayStatus.MissingResult:
      return (
        <>
          <div className={styles.leftSection}>
            <p className={styles.totalScore}>Total Score: {totalScore}</p>
          </div>
          <div className={styles.centerSection}>
            <p className={styles.missingData}>Missing Data</p>
          </div>
          <div className={styles.rightSection}>
            <CustomizableButton
              size="sm"
              type="submit"
              variant="opaque"
              className={styles.submit}
            >
              Submit
            </CustomizableButton>
          </div>
        </>
      );
    case DayStatus.WaitingResult:
      return (
        <>
          <div className={styles.leftSection}>
            <p className={styles.totalScore}>Total Score: {totalScore} </p>
          </div>
          <div className={styles.centerSection}>
            <p className={styles.waitingData}>Enter your Score</p>
          </div>
          <div className={styles.rightSection}>
            <CustomizableButton
              size="sm"
              type="submit"
              variant="opaque"
              className={styles.submit}
            >
              Submit
            </CustomizableButton>
          </div>
        </>
      );
    case DayStatus.HasResult:
      return (
        <>
          <div className={styles.leftSection}>
            <p className={styles.totalScore}>Total Score: {totalScore} </p>
          </div>
          <div className={styles.rightSection}>
            <CustomizableButton
              size="sm"
              type="submit"
              variant="opaque"
              className={styles.submit}
            >
              Update
            </CustomizableButton>
          </div>
        </>
      );
  }
};

export default CalendarDayView;
