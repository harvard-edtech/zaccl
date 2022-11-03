/**
 * Zoom recurrence info for meetings and webinars
 * @author Gabe Abrams
 */
type ZoomRecurrenceInfo = {
  // Select the final date on which the meeting will recur before it is
  // canceled. Should be in UTC time, such as 2017-11-25T12:00:00Z.
  // (Cannot be used with "end_times".)
  end_date_time?: string,
  // Select how many times the meeting should recur before it is canceled.
  // (Cannot be used with "end_date_time".)
  end_times?: number,
  // Use this field only if you're scheduling a recurring meeting of type
  // 3 to state which day in a month, the meeting should recur. The value
  // range is from 1 to 31.
  // For instance, if you would like the meeting to recur on 23rd of each
  // month, provide 23 as the value of this field and 1 as the value of
  // the repeat_interval field. Instead, if you would like the meeting to
  // recur every three months, on 23rd of the month, change the value of
  // the repeat_interval field to 3.
  monthly_day?: number,
  // Use this field only if you're scheduling a recurring meeting of type
  // 3 to state the week of the month when the meeting should recur.
  // If you use this field, you must also use the monthly_week_day
  // field to state the day of the week when the meeting should recur.
  // -1 represents the last week of the month
  monthly_week?: (-1 | 1 | 2 | 3 | 4),
  // Use this field only if you're scheduling a recurring meeting of type
  // 3 to state a specific day in a week when the monthly meeting should
  // recur. To use this field, you must also use the monthly_week field.
  // 1 = Sunday, 2 = Monday, ..., 7 = Saturday
  monthly_week_day?: (1 | 2 | 3 | 4 | 5 | 6 | 7),
  // Define the interval at which the meeting should recur.
  // For instance, if you would like to schedule a meeting that recurs
  // every two months, you must set the value of this field as 2 and the
  // value of the type parameter as 3.
  // For a daily meeting, the maximum interval you can set is 90 days.
  // For a weekly meeting the maximum interval that you can set is of 12
  // weeks. For a monthly meeting, there is a maximum of 3 months.
  repeat_interval?: number,
  // Recurrence meeting types, 1 = Daily, 2 = Weekly, 3 = Monthly
  type?: number,
  // This field is required if you're scheduling a recurring meeting of
  // type 2 to state which day(s) of the week the meeting should repeat. 
  // The value for this field could be a number between 1 to 7 in string
  // format. For instance, if the meeting should recur on Sunday,
  // provide "1" as the value of this field.
  // Note: If you would like the meeting to occur on multiple days of a
  // week, you should provide comma separated values for this field.
  // For instance, if the meeting should recur on Sundays and Tuesdays
  // provide "1,3" as the value of this field.
  weekly_days?: string,
};

export default ZoomRecurrenceInfo;
