# timeLogged
Log Time Chrome Extension

_480_

That's the number of minutes in a 100% productive, 8 hour workday. Easy to remember? Sure. But, say your metrics are tracked by 90% threshold by the Week and the Month. Ideally, you'd hit 100% every day, and wouldn't need to worry about being short of the mark weekly or monthly. Sadly, that's not realistic.

This Chrome Extension is designed to add functionality to already existent reports within our internal CRM software. We already have quick access reports for Weekly Summary and Monthly Summary, but they do not give you the visual and easily accessible indicators of performance: just raw minutes. The extension allows the user to show log time by percentage and also by a color-coated legend (green > 90%, 80% < yellow < 90%, and red < 80%). The percentage is calculated by the day, but also totals out differently for both reports. The Weekly Summary calculates the Total minutes/percentage by how close you are to reaching the mark if the week ended that day. This gives you a feeling of your "progress" towards that goal throughout the week. The Monthly Summary gives you the total minutes/percentage month-to-date, giving you an overall idea of how you're doing this month.

This was my first project I completed with JavaScript (and in general, really). 

Things I Learned:
1. Interacting with the DOM
2. Google Chrome Extension structure
3. Debugging code in Console

_Demo_
Weekly Summary

<p align="center">
  <img src="/images/demo/weeklySummary.gif" width="390px" align="center" alt="demoWeekly" />
</p>

Monthly Summary
<p align="center">
  <img src="/images/demo/monthlySummary.gif" width="390px" align="center" alt="demoMonthly" />
</p>
