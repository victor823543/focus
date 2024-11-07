import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SuccessAlert, useAlerts } from "../../../hooks/useAlerts";
import { useCalendar } from "../../../hooks/useCalendar";
import useSelectSession from "../../../hooks/useSelectSession";
import { DayStatus, ListDaysReturn, UpdateDayParams } from "../../../types/Day";
import { callAPI } from "../../../utils/apiService";
import { to1Dec, toYMD } from "../../../utils/functions";
import Alerts from "../../common/Alerts/Alerts";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { StaticCircularProgress } from "../../common/CircularProgress/CircularProgress";
import { Header } from "../../common/Headers/Headers";
import Loading from "../../common/Loading/Loading";
import { StyledRange } from "../../common/RangeInput/StyledRangeInput";
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
      importance: yup.number().min(1).max(3),
    }),
  ),
});

export type CreateDayFormFields = yup.InferType<typeof createDaySchema>;

const CalendarDayView: React.FC<CalendarDayViewProps> = ({ days }) => {
  const { alerts, pushAlert, removeAlert } = useAlerts();
  const queryClient = useQueryClient();
  const { currentDate, goToNextDay, goToPrevDay, getDateStatus } =
    useCalendar();
  const { currentSession } = useSelectSession();

  // Handle constants
  const thisDay = useMemo(() => days[toYMD(currentDate)], [days, currentDate]);
  const dayCategories = useMemo(
    () => (thisDay ? thisDay.categories : currentSession?.categories || []),
    [thisDay, currentSession],
  );
  const maxScore = useMemo(
    () =>
      thisDay ? thisDay.maxScore : currentSession ? currentSession.maxScore : 0,
    [thisDay, currentSession],
  );
  const currentDateString = toYMD(currentDate);

  // State for score
  const [totalScore, setTotalScore] = useState(
    currentDateString in days
      ? Math.round(
          thisDay.score.reduce(
            (total, category) => total + (category?.score || 0),
            0,
          ),
        )
      : 0,
  );
  const [calculatedScore, setCalculatedScore] = useState(
    currentDateString in days ? Math.round(thisDay.totalScore) : 0,
  );

  // Handle Date Status
  const [dateStatus, setDateStatus] = useState<DayStatus>(
    getDateStatus(currentDate, currentDateString in days),
  );

  useEffect(
    () => setDateStatus(getDateStatus(currentDate, currentDateString in days)),
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
      date: currentDateString,
      categories:
        currentDateString in days
          ? thisDay.score.map((category) => ({
              category: category.category,
              score: category.score,
              importance: category.importance,
            }))
          : dayCategories.map((category) => ({
              category: category.name,
              score: 0,
              importance: category.importance,
            })),
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
      queryClient.refetchQueries({
        queryKey: ["dashboard", currentSession?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats", currentSession?.id, toYMD(currentDate)],
      });
      pushAlert(new SuccessAlert("Day created successfully", { duration: 4 }));
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
      queryClient.refetchQueries({
        queryKey: ["dashboard", currentSession?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["stats", currentSession?.id, toYMD(currentDate)],
      });
      pushAlert(new SuccessAlert("Day updated successfully", { duration: 4 }));
    },
  });

  // Call correct mutation on submit
  const handleSubmit = (params: CreateDayFormFields) => {
    if (dateStatus === DayStatus.HasResult) {
      updateDayMutation.mutate({
        categoryScore: params.categories || [],
        dayId: thisDay.id,
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
        setCalculatedScore(
          currentCategories.reduce(
            (total, category) =>
              total + (category?.score || 0) * (category?.importance || 1),
            0,
          ),
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  if (!currentSession) return <Loading />;

  return (
    <form key={currentDateString} onSubmit={form.handleSubmit(handleSubmit)}>
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
            <div className={styles.score}>
              <h2>Day Score</h2>
              <div className={styles.scoreContainer}>
                <div className={styles.scoreTextWrapper}>
                  <p>
                    <strong>Total:</strong>
                    <span>{totalScore}</span>
                  </p>
                  <p>
                    <strong>Calculated:</strong>
                    <span>{to1Dec(calculatedScore)}</span>
                  </p>
                </div>
                <div className={styles.progressCircleWrapper}>
                  <StaticCircularProgress
                    size={50}
                    strokeWidth={2}
                    backgroundColor="var(--gray-x-light)"
                    color="var(--primary-color)"
                    pathLength={to1Dec(calculatedScore / maxScore)}
                  >
                    <div className={styles.circleContent}>
                      {to1Dec((calculatedScore / maxScore) * 100)}
                    </div>
                  </StaticCircularProgress>
                </div>
              </div>
            </div>

            <StatusBox status={dateStatus} />
          </div>
        )}

        {/* Main section */}
        <main className={styles.day}>
          {/* Display form if date is in session */}
          {![DayStatus.After, DayStatus.Before].includes(dateStatus) && (
            <div className={styles.grid}>
              {dayCategories.map((category, index) => {
                const startValue =
                  currentDateString in days
                    ? thisDay.score.find(
                        (categoryScore) =>
                          categoryScore.category === category.id,
                      )?.score
                    : 0;
                return (
                  <div
                    key={category.id}
                    className={styles.categoryWrapper}
                    style={{ "--hex": category.color.main } as CSSProperties}
                  >
                    <div className={styles.category}>
                      <div className={styles.categoryName}>{category.name}</div>
                      <div className={styles.categoryImportance}>
                        <span>X - {category.importance}</span>
                      </div>
                    </div>

                    <div className={styles.categoryResult}>
                      <StyledRange
                        form={form}
                        name={`categories.${index}.score`}
                        min={0}
                        max={10}
                        step={1}
                        fieldColor="var(--gray-light-tr)"
                        fillColor={category.color.main}
                        color="var(--gray-dark)"
                        startValue={startValue}
                        showValue="left-side"
                        height="2.5rem"
                        phoneHeight="3rem"
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
          )}

          {/* Display info if date not in session */}
          {[DayStatus.After, DayStatus.Before].includes(dateStatus) && (
            <div className={styles.info}>
              <Header variant="secondary" style={{ fontSize: "1.5rem" }}>
                {dateStatus === DayStatus.After
                  ? "This day is after the current date."
                  : "This day is before the span of your session."}
              </Header>
            </div>
          )}
        </main>
      </div>
      <Alerts
        list={alerts}
        onClose={(item) => removeAlert(item)}
        onDurationEnd={(item) => removeAlert(item)}
      />
    </form>
  );
};

// Status box component rendering a different box based of the status of current date
const StatusBox = ({ status }: { status: DayStatus }) => {
  switch (status) {
    case DayStatus.MissingResult:
      return (
        <div className={`${styles.status} ${styles.missingData}`}>
          <h2>Result is missing</h2>
          <CustomizableButton
            size="sm"
            type="submit"
            variant="primary"
            className={styles.submit}
          >
            <div>
              Submit
              <span className={styles.iconWrapper}>
                <CheckIcon strokeWidth={2} />
              </span>
            </div>
          </CustomizableButton>
        </div>
      );
    case DayStatus.WaitingResult:
      return (
        <div className={`${styles.status} ${styles.waitingResult}`}>
          <h2>Waiting for data</h2>
          <div className={styles.btnWrapper}>
            <CustomizableButton
              size="sm"
              type="submit"
              variant="primary"
              className={styles.submit}
            >
              <div>
                Submit
                <span className={styles.iconWrapper}>
                  <CheckIcon strokeWidth={2} />
                </span>
              </div>
            </CustomizableButton>
          </div>
        </div>
      );
    case DayStatus.HasResult:
      return (
        <div className={styles.hasResult}>
          <CustomizableButton
            size="sm"
            type="submit"
            variant="primary"
            className={styles.submit}
          >
            <div>
              Update
              <span className={styles.iconWrapper}>
                <CheckIcon strokeWidth={2} />
              </span>
            </div>
          </CustomizableButton>
        </div>
      );
  }
};

export default CalendarDayView;
