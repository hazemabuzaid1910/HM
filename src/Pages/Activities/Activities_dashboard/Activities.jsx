import './Activities.css'
import { Statistics4, Statistics2, Statistics3, Statistics1, ActivitesPortfolio } from '../../../Components/index'
import Head2 from '../../../Components/Head/Head2';
import image from '../../../assets/cinema.svg'
import imags from '../../../assets/car.svg'
import activity_imag from './../../../assets/activities.svg'
import { useNavigate } from 'react-router-dom';
function Activities() {

  let navigate = useNavigate();
  const goTosite=()=>{
    navigate('/Site')
  };
  const goToAddTrip = () => {
    navigate('/add_trip'); 
  };
  const goToAddSite = () => {
    navigate('/add_site'); 
  };
  const images = [
    image, image, image, image, image, image, image, image, image, image, image, image,
    
  ];
  const imagse = [
    imags, imags, imags, imags, imags, imags, imags, imags, imags, imags, imags, imags,
  ];
  return (
    <div>
    <Head2
      image={activity_imag}
      Title='Hotels Dashboard' 
      subTitle='Here’s what’s going on at your business right now'
      titleButton1='Add Trip'
      titleButton2='Add Site'
      onClickNavigation2={goToAddSite}
      onClickNavigation={goToAddTrip}
    />
    
      <ActivitesPortfolio images={images} onClick={goTosite}/>
      <ActivitesPortfolio images={imagse} onClick={''}/>

      <div className='statistics'>
        <Statistics1
          series1={10}
          series2={20}
          series3={30}
          series4={40}
          series5={50}
          series6={60}
          px1={2020}
          px2={2021}
          px3={2022}
          px4={2023}
          px5={2024}
          px6={2025}

        />
        <Statistics2
          value1={400}
          value2={200}
          value3={300}
          value4={500}
          label1={'Group A'}
          label2={'Group B'}
          label3={'Group C'}
          label4={'Group D'}
        />
        <Statistics3
          a1={2}
          a2={3}
          a3={4}
          a4={1}
          a5={2}
          b1={4}
          b2={4}
          b3={2}
          b4={1}
          b5={2}
          c1={5}
          c2={6}
          c3={3}
          c4={7}
          c5={1}
        />
        <Statistics4
          uv1={-15.69} uv2={-20.63} uv3={89.22} uv4={190.67} uv5={286.69} uv6={76.63} uv7={31.47}
        />
      
    </div>
    </div>

  )
}
//     

export default Activities