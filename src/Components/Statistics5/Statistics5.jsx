import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import './Statistics5.css';

const data = [
  { value: 5, label: 'A' },
  { value: 10, label: 'B' },
  { value: 15, label: 'C' },
  { value: 20, label: 'D' },
];

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')({
  fill: '#ffffff',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
});

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

PieCenterLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function PieChartWithCenterLabel() {
  return (
    <div className="Container5">
      <PieChart series={[{ data, innerRadius: 80 ,color:'#ffffff'}]} {...size}>
        <PieCenterLabel>Center label</PieCenterLabel>
      </PieChart>
    </div>
  );
}