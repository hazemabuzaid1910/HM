import './Add_Room.css';
import { Dialog } from "@mui/material";
import MultiImageUpload from '../../../Components/input/imageinput/imageinput2/imageinput2'; // Updated import
import Inputs from '../../../Components/input/normalinput/inputs';
import "primereact/resources/themes/lara-dark-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useState, useEffect } from 'react';
import Footer_Dialog from '../../../Components/Footer_Dialog/Footer_Dialog';
import PriceInput from '../../../Components/input/PriceInput/PriceInput';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom, resetState } from './Add_Room_Slice';
import { useNavigate } from 'react-router-dom';

const Add_Room = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.rooms);

  const [open, setOpen] = useState(true);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [roomData, setRoomData] = useState({
    property_id: '', // Will be set automatically
    name: '',
    type: '',
    description: '',
    number: '',
    price: '',
    multi_night_discount: '',
    available_start_date: '',
    available_end_date: '',
    points_discount_price: '',
    points_discount: '',
    photos: [],
    beds: [{ number: '', type: '' }, { number: '', type: '' }],
  });

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/services/properties/');
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error fetching property data:', response.status, errorText);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setProperties(data.results);
          const firstPropertyId = data.results[0].id;
          setRoomData(prev => ({ ...prev, property_id: firstPropertyId }));
          setSelectedPropertyId(firstPropertyId);
        }
      } catch (error) {
        console.error('Error fetching property data:', error.message);
      }
    };

    fetchPropertyData();
  }, []);

  const handlePropertyChange = (e) => {
    const selectedId = e.target.value;
    setSelectedPropertyId(selectedId);
    setRoomData(prev => ({ ...prev, property_id: selectedId }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (files) => {
    setRoomData(prev => ({
      ...prev,
      photos: files,
    }));
  };

  const handleBedChange = (index, field, value) => {
    const newBeds = [...roomData.beds];
    newBeds[index] = { ...newBeds[index], [field]: value };
    setRoomData(prev => ({ ...prev, beds: newBeds }));
  };

  const handleAddBed = () => {
    setRoomData(prev => ({
      ...prev,
      beds: [...prev.beds, { number: '', type: '' }],
    }));
  };

  const handleRemoveBed = (index) => {
    const newBeds = roomData.beds.filter((_, i) => i !== index);
    setRoomData(prev => ({ ...prev, beds: newBeds }));
  };

  const handleSubmit = () => {
    dispatch(addRoom(roomData));
  };

  const handleClose = () => {
    setOpen(false);
    navigate(`/hotel-page/${selectedPropertyId}`);
  };

  if (success) {
    dispatch(resetState());
    navigate(`/hotel-page/${selectedPropertyId}`);
  }

  return (
    <Dialog open={open} onClose={handleClose} className="dialog">
      <div className="add-room-container">
        <div className="upload-imageqw">
          <MultiImageUpload onImagesChange={handleImageChange} />
        </div>
        <div className="inputs1">
          <div className="coolinput">
            <label htmlFor="property" className="text">Select Property</label>
            <select
              name="property"
              className="select"
              value={selectedPropertyId}
              onChange={handlePropertyChange}
            >
              <option value="">Select Property</option>
              {properties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>

          <Inputs
            type="text"
            name="name"
            placeholder="Room Name"
            value={roomData.name}
            onChange={handleChange}
          />
          <div className="coolinput">
            <label htmlFor="type" className="text">Room Type</label>
            <select
              name="type"
              className="select"
              value={roomData.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Family">Family</option>
            </select>
          </div>
          <Inputs
            type="text"
            name="description"
            placeholder="Room Description"
            value={roomData.description}
            onChange={handleChange}
          />
          <Inputs
            type="number"
            name="number"
            placeholder="Room Number"
            value={roomData.number}
            onChange={handleChange}
          />
        </div>
        <div className="inputs2">
          <PriceInput
            name='price'
            placeholder='Enter Price'
            onChange={(e) => setRoomData({ ...roomData, price: e.target.value })}
            onCurrencySelect={(currency) => setRoomData({ ...roomData, currency })}
          />
        </div>
        <div className="inputs2">
          <Inputs
            type="text"
            name="multi_night_discount"
            placeholder="Multi Night Discount"
            value={roomData.multi_night_discount}
            onChange={handleChange}
          />
          <Inputs
            type="text"
            name="points_discount"
            placeholder="Points Discount"
            value={roomData.points_discount}
            onChange={handleChange}
          />
          <PriceInput
            placeholder="Points Discount Price"
            type="text"
            name="points_discount_price"
            value={roomData.points_discount_price}
            onChange={(e) => setRoomData({ ...roomData, points_discount_price: e.target.value })}
            onCurrencySelect={(currency) => setRoomData({ ...roomData, currency })}
          />
        </div>
        <div className="inputs2">
          <Inputs
            type="date"
            name="available_start_date"
            placeholder="Available Start Date"
            value={roomData.available_start_date}
            onChange={handleChange}
          />
          <Inputs
            type="date"
            name="available_end_date"
            placeholder="Available End Date"
            value={roomData.available_end_date}
            onChange={handleChange}
          />
        </div>
        <div className="beds-container">
          <h3>Beds</h3>
          {roomData.beds.map((bed, index) => (
            <div key={index} className="bed-entry">
              <Inputs
                type="number"
                name={`bed_number_${index}`}
                placeholder="Number of Beds"
                value={bed.number}
                onChange={(e) => handleBedChange(index, 'number', e.target.value)}
              />
              <Inputs
                type="text"
                name={`bed_type_${index}`}
                placeholder="Bed Type"
                value={bed.type}
                onChange={(e) => handleBedChange(index, 'type', e.target.value)}
              />
              <button type="button" onClick={() => handleRemoveBed(index)}>Remove Bed</button>
            </div>
          ))}
          <button type="button" onClick={handleAddBed}>Add Bed</button>
        </div>
        <div className="footer_dialog2">
          <Footer_Dialog onClick2={handleSubmit} onClick1={handleClose} />
        </div>
      </div>
    </Dialog>
  );
};

export default Add_Room;
