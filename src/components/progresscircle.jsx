import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = ({ progress }) => {
  return (
    <div style={{ width: '150px', height: '150px' }}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          textSize: '20px',
          pathColor: '#4db8ff',
          textColor: '#4db8ff',
          trailColor: '#f4f4f4',
          strokeWidth: 8,
        })}
      />
    </div>
  );
};

export default ProgressCircle;
