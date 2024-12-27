from datetime import datetime
from pytz import timezone

def get_et_time_index():
    tz = timezone('EST')
    dt = str(datetime.now(tz)).split(" ")[1].split(":")
    print(dt)
    hr = int(dt[0])
    # hour index calculation
    if hr == 12:
        hr_index = 1
    else:
        hr_index = hr + 1
    # minutes index calculation
    min = 5*round(int(dt[1])/5)+5
    min_list = [5 * i for i in range(0, 12)]
    if min > 55:
        min = 0
        hr = hr + 1
    mins_index = min_list.index(min)+1
    return hr_index, mins_index

print(get_et_time_index())