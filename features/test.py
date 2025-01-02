from datetime import datetime
from pytz import timezone
tz = timezone('EST')
print(datetime.now(tz))
dt = str(datetime.now(tz)).split(" ")[1].split(":")
# print(dt[0])
# print(dt[1])

# pick_mins = 5*round(int(dt[1])/5)+5
# print(pick_mins)
# if pick_mins > 55:
#     dt[0] = int(dt[0])+1
#     pick_mins = dt[1] = 0
#
# print([5 * i for i in range(0, 12)])
# print([5 * i for i in range(0, 12)].index(pick_mins)+1)
#
# print(dt[0])
# print(dt[1])
