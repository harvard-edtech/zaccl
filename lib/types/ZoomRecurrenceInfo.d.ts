/**
 * Zoom recurrence info for meetings and webinars
 * @author Gabe Abrams
 */
declare type ZoomRecurrenceInfo = {
    end_date_time?: string;
    end_times?: number;
    monthly_day?: number;
    monthly_week?: (-1 | 1 | 2 | 3 | 4);
    monthly_week_day?: (1 | 2 | 3 | 4 | 5 | 6 | 7);
    repeat_interval?: number;
    type?: number;
    weekly_days?: string;
};
export default ZoomRecurrenceInfo;
