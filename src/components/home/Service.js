import React, { useState } from "react";
import CommonHeading from "../common/CommonHeading";
import { services } from "../data/Data";
import Modal from "../common/Modal";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false)
  const [openBirdModal, setOpenBirdModal] = useState(false)
  const [openButterflyModal, setOpenButterflyModal] = useState(false)
  const [openWaterfallModal, setOpenWaterfallModal] = useState(false)
  const [openOrchidModal, setOpenOrchidModal] = useState(false)
  const [openDanceModal, setOpenDanceModal] = useState(false)
  const [openHouseModal, setOpenHouseModal] = useState(false)
  const [openKopiModal, setOpenKopiModal] = useState(false)
  const [openSayurModal, setOpenSayurModal] = useState(false)
  const [openUsahaModal, setOpenUsahaModal] = useState(false)

  const handleServiceClick = (serviceName) => {
    if (serviceName === "birdWatching") {
      setOpenBirdModal(true);
    } else if (serviceName === "butterflies") {
      setOpenButterflyModal(true);
    } else if (serviceName === "waterfall") {
      setOpenWaterfallModal(true);
    } else if (serviceName === "orchids") {
      setOpenOrchidModal(true);
    } else if (serviceName === "dance") {
      setOpenDanceModal(true);
    } else if (serviceName === "house") {
      setOpenHouseModal(true);
    } else if (serviceName === "kopi") {
      setOpenKopiModal(true);
    } else if (serviceName === "sayur") {
      setOpenSayurModal(true);
    } else if (serviceName === "usaha") {
      setOpenUsahaModal(true);
    }
  }

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <CommonHeading
              // heading="Beberapa Potensi Lokal Yang Dimiliki Kampung Kwau"
              title={t('home:services.subtitle')}
              subtitle={t('home:services.title')}
            />
          </div>
          <div className="row g-4">
          <div onClick={() => setOpenModal(!openModal)} type="button" className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                <a className="service-item rounded">
                  <div className="service-icon bg-transparent border rounded p-1">
                    <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-spa fa-2x text-primary"></i>
                    </div>
                  </div>
                                     <h5 className="mb-3" dangerouslySetInnerHTML={{ __html: t('home:services.bananaTree.title') }}></h5>
                  <p className="text-body mb-0">{t('home:services.bananaTree.description')}</p>
                </a>
              </div>
            {services.map((item, index) => (
              <div 
                key={index}
                onClick={() => handleServiceClick(item.name)} 
                type="button" 
                className="col-lg-4 col-md-6 wow fadeInUp" 
                data-wow-delay="0.1s"
              >
                <a className="service-item rounded">
                  <div className="service-icon bg-transparent border rounded p-1">
                    <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                      {item.icon}
                    </div>
                  </div>
                  <h5 className="mb-3">{t(`home:services.${item.name}.title`)}</h5>
                  <p className="text-body mb-0">{t(`home:services.${item.discription}.description`)}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Modal untuk Pohon Pisang Hutan Raksasa */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                 <Modal.Header dangerouslySetInnerHTML={{ __html: t('home:services.bananaTree.title') }}></Modal.Header>
        <Modal.Body>
        <p>
        {t('home:services.bananaTree.description')}
        </p>
        <img src="/assets/img/pisang.JPG" alt="Pohon Pisang Hutan Raksasa" className="img-foto" />
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Birds Watching */}
      <Modal isOpen={openBirdModal} onClose={() => setOpenBirdModal(false)}>
        <Modal.Header>{t('modal:birdWatching.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:birdWatching.description')}</p>
            <img src="/assets/img/westernparotia.jpg" alt="Burung Endemik Papua" className="img-foto" />
          <h6 className="text-primary mt-4 mb-3">{t('modal:birdWatching.speciesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:birdWatching.species', { returnObjects: true }).map((species, index) => (
              <li key={index}><strong>{species.split(' - ')[0]}</strong> - {species.split(' - ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:birdWatching.bestTimeTitle')}</h6>
          <ul className="mb-3">
            {t('modal:birdWatching.bestTime', { returnObjects: true }).map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:birdWatching.facilitiesTitle')}</h6>
          <ul className="mb-4">
            {t('modal:birdWatching.facilities', { returnObjects: true }).map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Keanekaragaman Kupu-Kupu */}
      <Modal isOpen={openButterflyModal} onClose={() => setOpenButterflyModal(false)}>
        <Modal.Header>{t('modal:butterflies.title')}</Modal.Header>
        <Modal.Body>
          
          <p>{t('modal:butterflies.description')}</p>
           <img src="/assets/img/kupukupu.JPG" alt="Pohon Pisang Hutan Raksasa" className="img-foto" />
          <h6 className="text-primary mt-4 mb-3">{t('modal:butterflies.speciesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:butterflies.species', { returnObjects: true }).map((species, index) => (
              <li key={index}><strong>{species.split(' - ')[0]}</strong> - {species.split(' - ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:butterflies.bestTimeTitle')}</h6>
          <ul className="mb-3">
            {t('modal:butterflies.bestTime', { returnObjects: true }).map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:butterflies.locationsTitle')}</h6>
          <ul className="mb-3">
            {t('modal:butterflies.locations', { returnObjects: true }).map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:butterflies.tipsTitle')}</h6>
          <ul className="mb-4">
            {t('modal:butterflies.tips', { returnObjects: true }).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:butterflies.quote')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Air Terjun */}
      <Modal isOpen={openWaterfallModal} onClose={() => setOpenWaterfallModal(false)}>
        <Modal.Header>{t('modal:waterfall.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:waterfall.description')}</p>
           <img src="/assets/img/airterjun.JPG" alt="Air Terjun Kampung Kwau" className="img-foto" />
          <h6 className="text-primary mt-4 mb-3">{t('modal:waterfall.characteristicsTitle')}</h6>
          <ul className="mb-3">
            {t('modal:waterfall.characteristics', { returnObjects: true }).map((characteristic, index) => (
              <li key={index}><strong>{characteristic.split(': ')[0]}:</strong> {characteristic.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:waterfall.activitiesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:waterfall.activities', { returnObjects: true }).map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:waterfall.accessTitle')}</h6>
          <ul className="mb-3">
            {t('modal:waterfall.access', { returnObjects: true }).map((access, index) => (
              <li key={index}><strong>{access.split(': ')[0]}:</strong> {access.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:waterfall.bestTimeTitle')}</h6>
          <ul className="mb-4">
            {t('modal:waterfall.bestTime', { returnObjects: true }).map((time, index) => (
              <li key={index}><strong>{time.split(': ')[0]}:</strong> {time.split(': ')[1]}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Macam-macam tanaman angrek */}
      <Modal isOpen={openOrchidModal} onClose={() => setOpenOrchidModal(false)}>
        <Modal.Header>{t('modal:orchids.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:orchids.description')}</p>
          <img src="/assets/img/angrek.JPG" alt="angrek" className="img-foto" />
          <h6 className="text-primary mt-4 mb-3">{t('modal:orchids.speciesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:orchids.species', { returnObjects: true }).map((species, index) => (
              <li key={index}><strong>{species.split(' - ')[0]}</strong> - {species.split(' - ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:orchids.habitatTitle')}</h6>
          <ul className="mb-3">
            {t('modal:orchids.habitat', { returnObjects: true }).map((habitat, index) => (
              <li key={index}><strong>{habitat.split(': ')[0]}:</strong> {habitat.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:orchids.bloomingTitle')}</h6>
          <ul className="mb-3">
            {t('modal:orchids.blooming', { returnObjects: true }).map((blooming, index) => (
              <li key={index}><strong>{blooming.split(': ')[0]}:</strong> {blooming.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:orchids.conservationTitle')}</h6>
          <ul className="mb-3">
            {t('modal:orchids.conservation', { returnObjects: true }).map((conservation, index) => (
              <li key={index}>{conservation}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:orchids.tipsTitle')}</h6>
          <ul className="mb-4">
            {t('modal:orchids.tips', { returnObjects: true }).map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:orchids.quote')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Tari Tumbu Tanah */}
      <Modal isOpen={openDanceModal} onClose={() => setOpenDanceModal(false)}>
        <Modal.Header>{t('modal:dance.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:dance.description')}</p>
          
          <h6 className="text-primary mt-4 mb-3">{t('modal:dance.meaningTitle')}</h6>
          <ul className="mb-3">
            {t('modal:dance.meaning', { returnObjects: true }).map((meaning, index) => (
              <li key={index}><strong>{meaning.split(': ')[0]}:</strong> {meaning.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:dance.movementsTitle')}</h6>
          <ul className="mb-3">
            {t('modal:dance.movements', { returnObjects: true }).map((movement, index) => (
              <li key={index}><strong>{movement.split(': ')[0]}:</strong> {movement.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:dance.costumeTitle')}</h6>
          <ul className="mb-3">
            {t('modal:dance.costume', { returnObjects: true }).map((costume, index) => (
              <li key={index}><strong>{costume.split(': ')[0]}:</strong> {costume.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:dance.eventsTitle')}</h6>
          <ul className="mb-3">
            {t('modal:dance.events', { returnObjects: true }).map((event, index) => (
              <li key={index}><strong>{event.split(': ')[0]}:</strong> {event.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:dance.experienceTitle')}</h6>
          <ul className="mb-4">
            {t('modal:dance.experience', { returnObjects: true }).map((experience, index) => (
              <li key={index}>{experience}</li>
            ))}
          </ul>
          <img src="/assets/img/tari.png" alt="Rumah Kaki Seribu" className="img-foto" />
          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:dance.quote')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Rumah Kaki Seribu */}
      <Modal isOpen={openHouseModal} onClose={() => setOpenHouseModal(false)}>
        <Modal.Header>{t('modal:house.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:house.description')}</p>
          <img src="/assets/img/rumah.JPG" alt="Rumah Kaki Seribu" className="img-foto" />
          <h6 className="text-primary mt-4 mb-3">{t('modal:house.constructionTitle')}</h6>
          <ul className="mb-3">
            {t('modal:house.construction', { returnObjects: true }).map((construction, index) => (
              <li key={index}><strong>{construction.split(': ')[0]}:</strong> {construction.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:house.philosophyTitle')}</h6>
          <ul className="mb-3">
            {t('modal:house.philosophy', { returnObjects: true }).map((philosophy, index) => (
              <li key={index}><strong>{philosophy.split(': ')[0]}:</strong> {philosophy.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:house.functionTitle')}</h6>
          <ul className="mb-3">
            {t('modal:house.function', { returnObjects: true }).map((function_, index) => (
              <li key={index}><strong>{function_.split(': ')[0]}:</strong> {function_.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:house.advantagesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:house.advantages', { returnObjects: true }).map((advantage, index) => (
              <li key={index}><strong>{advantage.split(': ')[0]}:</strong> {advantage.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:house.experienceTitle')}</h6>
          <ul className="mb-3">
            {t('modal:house.experience', { returnObjects: true }).map((experience, index) => (
              <li key={index}>{experience}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:house.conservationTitle')}</h6>
          <ul className="mb-4">
            {t('modal:house.conservation', { returnObjects: true }).map((conservation, index) => (
              <li key={index}>{conservation}</li>
            ))}
          </ul>
          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:house.quote')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

{/* Modal untuk Kopi */}
      <Modal isOpen={openKopiModal} onClose={() => setOpenKopiModal(false)}>
        <Modal.Header>{t('modal:kopi.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:kopi.description')}</p>
         <h6 className="text-primary mb-3">{t('modal:kopi.constructionTitle')}</h6>
          <img src="/assets/img/pohonkopi.png" alt="Kopi Kwau" className="img-foto" />
          <ul className="mb-4">
            {t('modal:kopi.construction', { returnObjects: true }).map((construction, index) => (
              <li key={index}>{construction}</li>
            ))}
          </ul>
          <h6 className="text-primary mb-3">{t('modal:kopi.philosophyTitle')}</h6>
          <img src="/assets/img/buahkopi.jpg" alt="Kopi Kwau" className="img-foto" />
          <ul className="mb-3">
            {t('modal:kopi.philosophy', { returnObjects: true }).map((philosophy, index) => (
              <li key={index}><strong>{philosophy.split(': ')[0]}:</strong> {philosophy.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:kopi.functionTitle')}</h6>
           <img src="/assets/img/kopi2.JPG" alt="Kopi Kwau" className="img-foto" />
          <ul className="mb-3">
            {t('modal:kopi.function', { returnObjects: true }).map((function_, index) => (
              <li key={index}><strong>{function_.split(': ')[0]}:</strong> {function_.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:kopi.advantagesTitle')}</h6>
         <img src="/assets/img/jemurkopi.jpg" alt="Kopi Kwau" className="img-foto" />
          <ul className="mb-3">
            {t('modal:kopi.advantages', { returnObjects: true }).map((advantage, index) => (
              <li key={index}><strong>{advantage.split(': ')[0]}:</strong> {advantage.split(': ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:kopi.experienceTitle')}</h6>
          <img src="/assets/img/jemurkopi.jpg" alt="Kopi Kwau" className="img-foto" />
          <ul className="mb-3">
            {t('modal:kopi.experience', { returnObjects: true }).map((experience, index) => (
              <li key={index}>{experience}</li>
            ))}
          </ul>
        
        <h6 className="text-primary mb-3">{t('modal:kopi.coffeeTitle')}</h6>
         <img src="/assets/img/jemurkopi.jpg" alt="Kopi Kwau" className="img-foto" />
          <ul className="mb-3">
            {t('modal:kopi.coffee', { returnObjects: true }).map((coffee, index) => (
              <li key={index}><strong>{coffee.split(': ')[0]}:</strong> {coffee.split(': ')[1]}</li>
            ))}
          </ul>
        
          <h6 className="text-primary mb-3">{t('modal:kopi.conservationTitle')}</h6>
          <img src="/assets/img/kopisudahdikupas.JPG" alt="Kopi Kwau" className="img-foto" />
          <ul className="mb-4">
            {t('modal:kopi.conservation', { returnObjects: true }).map((conservation, index) => (
              <li key={index}>{conservation}</li>
            ))}
          </ul>
        <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:kopi.quote')}"</em>
          </div>
          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:kopi.contact')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Sayur  */}
      <Modal isOpen={openSayurModal} onClose={() => setOpenSayurModal(false)}>
        <Modal.Header>{t('modal:sayur.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:sayur.description')}
            <img src="/assets/img/kebunkebun.JPG" alt="Sayur" className="img-foto" /> 
          </p>

          <h6 className="text-primary mb-3">{t('modal:sayur.experienceTitle')}</h6>
          <img src="/assets/img/pasarwosi.JPG" alt="Sayur" className="img-foto" /> 
          <ul className="mb-3">
            {t('modal:sayur.experience', { returnObjects: true }).map((experience, index) => {
              <li key={index}>{experience}</li>
            })}
          </ul>
          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:sayur.quote')}"</em>
          </div>
          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:kopi.contact')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      {/* Modal untuk Usaha Kampung Kwau */}
      <Modal isOpen={openUsahaModal} onClose={() => setOpenUsahaModal(false)}>
        <Modal.Header>{t('modal:usaha.title')}</Modal.Header>
        <Modal.Body>
          <p>{t('modal:usaha.description')}</p>
          
          <h6 className="text-primary mt-4 mb-3">{t('modal:usaha.businessTypesTitle')}</h6>
          <ul className="mb-3">
            {t('modal:usaha.businessTypes', { returnObjects: true }).map((business, index) => (
              <li key={index}><strong>{business.split(' - ')[0]}</strong> - {business.split(' - ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:usaha.productsTitle')}</h6>
          <ul className="mb-3">
            {t('modal:usaha.products', { returnObjects: true }).map((product, index) => (
              <li key={index}><strong>{product.split(' - ')[0]}</strong> - {product.split(' - ')[1]}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:usaha.marketTitle')}</h6>
          <ul className="mb-3">
            {t('modal:usaha.market', { returnObjects: true }).map((market, index) => (
              <li key={index}>{market}</li>
            ))}
          </ul>

          <h6 className="text-primary mb-3">{t('modal:usaha.supportTitle')}</h6>
          <ul className="mb-4">
            {t('modal:usaha.support', { returnObjects: true }).map((support, index) => (
              <li key={index}>{support}</li>
            ))}
          </ul>

          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:usaha.quote')}"</em>
          </div>
          <div className="text-center mb-3">
            <em className="text-muted">"{t('modal:usaha.contact')}"</em>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">{t('common:close')}</Modal.DismissButton>
        </Modal.Footer>
      </Modal>

      
    </>
  );
}
