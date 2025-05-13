import './schedule.scss';

interface itemProps {
    day: string;
    morning: string;
    afternoon: string;
}

interface ScheduleInputProps {
    item : itemProps;
    index: number;
    setSchedule: (schedule:itemProps) => void;
    schedule: itemProps[];
};

const ScheduleInput = ({item,index, setSchedule, schedule}: ScheduleInputProps) => {
  return (
    <div key={item.day} className="input-schedule-day-row">
        <label className="input-schedule-day-label" >{item.day}</label>
        <div className="input-schedule-day-inputs-container">
            <input
            type="text"
            className="input-schedule"
            placeholder="Matin"
            value={item.morning}
            onChange={(e) => {
                const newSchedule = [...schedule];
                newSchedule[index].morning = e.target.value;
                setSchedule(newSchedule);
            }}
            />
            <input
            type="text"
            className="input-schedule"
            placeholder="Après-midi"
            value={item.afternoon}
            onChange={(e) => {
                const newSchedule = [...schedule];
                newSchedule[index].afternoon = e.target.value;
                setSchedule(newSchedule);
            }}
            />
        </div>
    </div>
  )
}

export default ScheduleInput