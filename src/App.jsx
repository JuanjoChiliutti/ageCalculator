
import './App.css'
import {useState} from 'react'


function App() {
  
  const [values, setValues] = useState({
    day: '',
    month: '',
    year: ''
  });
  const [errors, setErrors] = useState({
    day:'', 
    month:'', 
    year:''
  });
  const [showResults, setShowResults] = useState(false)
  const handleClick = () => {
    setShowResults(true);
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;    
    const trimmedValue = value.trim();
    let error = '';

    let truncatedValue = trimmedValue;
    if (name === 'day' || name === 'month') {
      // Restringir la longitud a dos caracteres solo para día y mes
      truncatedValue = trimmedValue.slice(0, 2);
    } else if (name === 'year') {
      truncatedValue =trimmedValue.slice(0,4);
    }
    let currentYear = new Date().getFullYear();

    switch (name) {
      case 'day':
        if (truncatedValue !== '' && (truncatedValue < 1 || truncatedValue > 31)) {
          error = 'Must be a valid day';
        }
        break;
      case 'month':
        if (truncatedValue !== '' && (truncatedValue < 1 || truncatedValue > 12)) {
          error = 'Must be a valid month';
        }
        break;
      case 'year':
        if (truncatedValue !== '' && truncatedValue >= currentYear) {
          error = 'Must be in the past';
        }
        break;
      default:
        break;
    }

    setValues((prevValues) => ({
      ...prevValues,
      [name]: truncatedValue
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  
  let fechaActual = new Date()
  let years = fechaActual.getFullYear() - values.year
  let months = fechaActual.getUTCMonth() + 1 - values.month
  let days = fechaActual.getDate() - values.day
  
  if (days < 0) {
    months -= 1
    const lastDayLastMonth = new Date(fechaActual.getFullYear(), fechaActual.getMonth(),0).getDate()
    days += lastDayLastMonth
  }
  if(months < 0) {
    years -= 1
    months += 12
  }
  

  return (
    <>
      <div className='contenedor-principal'>
        <div className='contenedor-secundario'>
          <div className='superior'>
            <div className='inputfecha'>
              {errors.day ? <h6 style={{color: 'red'}}> DAY </h6> : <h6>DAY</h6>}
              <input className={errors.day ? 'inputError' : ''} inputMode='number' type="number" name='day' placeholder='DD' value={values.day} onChange={handleChange} />
              {errors.day && <p style={{ color: 'red', fontSize: 'xx-small'}}>{errors.day}</p>}
            </div>
            <div className='inputfecha'>
            {errors.month ? <h6 style={{color: 'red'}}> MONTH </h6> : <h6>MONTH</h6>}
              <input className={errors.month ? 'inputError' : ''} inputMode='number' type="number" name="month" id="" placeholder='MM' value={values.month} onChange={handleChange} />
              {errors.month && <p style={{ color: 'red', fontSize: 'xx-small'}}>{errors.month}</p>}
            </div>
            <div className='inputfecha'>
            {errors.year ? <h6 style={{color: 'red'}}> YEAR </h6> : <h6>YEAR</h6>}
              <input className={errors.year ? 'inputError' : ''} inputMode='number' type="number" name="year" id="" placeholder='YYYY' value= {values.year} onChange={handleChange}/>
              
          {errors.year && <p style={{ color: 'red', fontSize: 'xx-small'}}>{errors.year}</p>}
            </div>
          </div>
          <div className='medio'>
            <hr /><button className='btn' onClick={handleClick}></button>
          </div>
          <div className='principal'>
    
            {(showResults && !errors.day && !errors.month && !errors.year && values.day && values.month && values.year) && (
              <>
                <h1><span>{years}</span> years</h1>
                <h1><span>{months}</span> months</h1>
                <h1><span>{days}</span> days</h1>
              </>
            )} 
            {(!showResults || errors.day || errors.month || errors.year || !values.day || !values.month || !values.year) && (
              <>
                <h1><span>--</span> years</h1>
                <h1><span>--</span> months</h1>
                <h1><span>--</span> days</h1>
              </>
            )}
          

          </div>

         

        </div>
      </div>
      
    </>
  )
}

export default App
