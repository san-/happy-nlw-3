import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useHistory } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function CreateOrphanage() {

  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [contact, setContact] = useState('');
  const [is_whatsapp, setIsWhatsapp] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);


  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
    const selectedImagesPreiew = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreiew);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;
    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('contact', contact);
    data.append('is_whatsapp', String(is_whatsapp));
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso');
    history.push('/app');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-26.8458324, -53.0009323]}
              style={{ width: '100%', height: 280 }}
              zoom={14}
              onclick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {position.latitude !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              )}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImages} type="file" id="image[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horários</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}>Sim</button>
                <button type="button" className={open_on_weekends ? "" : "active"}
                  onClick={() => setOpenOnWeekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="input-block">
              <label htmlFor="contact">Contato</label>
              <input id="contact" value={contact} onChange={e => setContact(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="is_whatsapp">Whatsapp?</label>

              <div className="button-select-whatsapp">
                <div className="button-select">
                  <button type="button" className={is_whatsapp ? "active" : ""}
                    onClick={() => setIsWhatsapp(true)}>Sim</button>
                  <button type="button" className={is_whatsapp ? "" : "active"}
                    onClick={() => setIsWhatsapp(false)}>Não</button>
                </div>
                <div className="link-test-whatsapp">
                  {is_whatsapp && (
                    <a href={`https://api.whatsapp.com/send?phone=${contact}`} target="_blank" rel="noopener noreferrer" className="contact-button">
                      <FaWhatsapp size={20} color="#FFF" />
                Testar link do Whatsapp
                    </a>
                  )}
                </div>
              </div>

            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
