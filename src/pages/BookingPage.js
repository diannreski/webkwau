import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Heading from "../components/common/Heading";
import { bookingAPI } from '../services/apiService';

const BookingPage = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  // Watch form values for real-time calculation
  const watchedAdults = watch('adults', 1);
  const watchedChildren = watch('children', 0);

  // Calculate duration
  const duration = checkInDate && checkOutDate 
    ? Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    : 1;

  // Tidak ada perhitungan harga atau pemilihan paket pada UI

  // Handle date validation
  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    if (checkOutDate && date >= checkOutDate) {
      setCheckOutDate(null);
    }
  };

  // Submit booking
  const onSubmit = async (data) => {
    if (!checkInDate || !checkOutDate) {
      toast.error('Harap lengkapi semua data booking');
      return;
    }

    setIsSubmitting(true);
    try {
      // Clean data before sending to API (tanpa harga/paket)
      const cleanBookingData = {
        customer: {
          name: data.customerName,
          email: data.email,
          phone: data.phone,
          nationality: data.nationality,
          emergencyContact: data.emergencyContact
        },
        package: {
          name: 'Basic Package'
        },
        check_in_date: checkInDate.toISOString().split('T')[0],
        check_out_date: checkOutDate.toISOString().split('T')[0],
        duration,
        adults_count: parseInt(data.adults),
        children_count: parseInt(data.children),
        adult_price: 0,
        child_price: 0,
        special_requests: {
          dietaryRestrictions: '',
          accessibilityNeeds: '',
          specialOccasion: '',
          additionalNotes: ''
        }
      };

      // Send to backend API
      const apiResult = await bookingAPI.create(cleanBookingData);
      console.log('✅ Booking sent to API:', apiResult);

      // Send admin notification email
      try {
        const adminNotificationData = {
          customer: {
            name: data.customerName,
            email: data.email,
            phone: data.phone,
            nationality: data.nationality,
            emergencyContact: data.emergencyContact
          },
          bookingNumber: apiResult.data.booking_number,
          booking: {
            packageName: 'Basic Package',
            checkIn: checkInDate.toISOString(),
            checkOut: checkOutDate.toISOString(),
            duration,
            guests: {
              adults: parseInt(data.adults),
              children: parseInt(data.children)
            }
          },
         
          specialRequests: {
            dietaryRestrictions: data.dietaryRestrictions || '',
            accessibilityNeeds: data.accessibilityNeeds || '',
            specialOccasion: data.specialOccasion || '',
            additionalNotes: data.additionalNotes || ''
          }
        };
        
        // Import sendAdminNotification
        const { sendAdminNotification } = await import('../services/emailService');
        await sendAdminNotification(adminNotificationData);
        console.log('✅ Admin notification sent');
      } catch (emailError) {
        console.warn('⚠️ Admin notification failed:', emailError);
        // Don't throw error - booking is still valid
      }

      // Send customer confirmation email
      try {
        const customerEmailData = {
          customer: {
            name: data.customerName,
            email: data.email,
            phone: data.phone,
            nationality: data.nationality,
            emergencyContact: data.emergencyContact
          },
          bookingNumber: apiResult.data.booking_number,
          booking: {
            packageName: 'Basic Package',
            checkIn: checkInDate.toISOString(),
            checkOut: checkOutDate.toISOString(),
            duration,
            guests: {
              adults: parseInt(data.adults),
              children: parseInt(data.children)
            }
          },
          specialRequests: {
            dietaryRestrictions: data.dietaryRestrictions || '',
            accessibilityNeeds: data.accessibilityNeeds || '',
            specialOccasion: data.specialOccasion || '',
            additionalNotes: data.additionalNotes || ''
          }
        };
        
        // Import sendBookingConfirmation
        const { sendBookingConfirmation } = await import('../services/emailService');
        await sendBookingConfirmation(customerEmailData);
        console.log('✅ Customer confirmation email sent');
      } catch (emailError) {
        console.warn('⚠️ Customer email failed:', emailError);
        // Don't throw error - booking is still valid
      }

      // Set booking result from API response
      setBookingResult({
        success: true,
        bookingId: apiResult.data.id,
        bookingNumber: apiResult.data.booking_number,
        booking: apiResult.data
      });
      setCurrentStep(3); // Success step
      toast.success('Booking berhasil dibuat!');
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Gagal membuat booking: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Heading heading="Booking Wisata" title="Home" subtitle="Booking" />
      
      <div className="container-xxl py-5">
        <div className="container">
          {/* Progress Steps */}
          <div className="row mb-5">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="d-flex align-items-center">
                    <div 
                      className={`rounded-circle d-flex align-items-center justify-content-center ${
                        currentStep >= step ? 'bg-primary text-white' : 'bg-light text-muted'
                      }`}
                      style={{ width: '40px', height: '40px' }}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div 
                        className={`bg-${currentStep > step ? 'primary' : 'light'}`}
                        style={{ width: '50px', height: '2px' }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center mt-2">
                <small className="text-muted">
                  {currentStep === 1 && 'Tanggal & Tamu'}
                  {currentStep === 2 && 'Data Pribadi'}
                  {currentStep === 3 && 'Konfirmasi'}
                </small>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1 is Date & Guests (rendered below) */}

            {/* Step 1: Date & Guests */}
            {currentStep === 1 && (
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h3 className="mb-4 text-center">{t('pages:booking.step2.title')}</h3>
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">{t('pages:booking.step2.checkIn')}</label>
                          <DatePicker
                            selected={checkInDate}
                            onChange={handleCheckInChange}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            placeholderText={t('pages:booking.step2.checkInPlaceholder')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">{t('pages:booking.step2.checkOut')}</label>
                          <DatePicker
                            selected={checkOutDate}
                            onChange={setCheckOutDate}
                            minDate={checkInDate ? new Date(checkInDate.getTime() + 24*60*60*1000) : new Date()}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            placeholderText={t('pages:booking.step2.checkOutPlaceholder')}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">{t('pages:booking.step2.adults')}</label>
                          <select 
                            className="form-select" 
                            {...register('adults', { required: t('pages:booking.step2.adultsRequired'), min: 1 })}
                          >
                            {[1,2,3,4,5,6,7,8].map(num => (
                              <option key={num} value={num}>{num} {t('pages:booking.step2.adultsOption')}</option>
                            ))}
                          </select>
                          {errors.adults && <div className="text-danger">{errors.adults.message}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">{t('pages:booking.step2.children')}</label>
                          <select className="form-select" {...register('children')}>
                            {[0,1,2,3,4].map(num => (
                              <option key={num} value={num}>{num} {t('pages:booking.step2.childrenOption')}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between mt-4">
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => setCurrentStep(1)}
                        >
                          {t('pages:booking.back')}
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-primary"
                          onClick={() => setCurrentStep(2)}
                          disabled={!checkInDate || !checkOutDate}
                        >
                          {t('pages:booking.next')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

  

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="row">
                <div className="col-lg-8 mx-auto">
                  <h3 className="mb-4 text-center">{t('pages:booking.step4.title')}</h3>
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">{t('pages:booking.step4.fullName')} *</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder={t('pages:booking.step4.placeholder.fullName')}
                            {...register('customerName', { required: t('pages:booking.step4.fullName') + ' harus diisi' })}
                          />
                          {errors.customerName && <div className="text-danger">{errors.customerName.message}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">{t('pages:booking.step4.email')} *</label>
                          <input 
                            type="email" 
                            className="form-control" 
                            placeholder={t('pages:booking.step4.placeholder.email')}
                            {...register('email', { 
                              required: t('pages:booking.step4.email') + ' harus diisi',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Format email tidak valid'
                              }
                            })}
                          />
                          {errors.email && <div className="text-danger">{errors.email.message}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">{t('pages:booking.step4.phone')} *</label>
                          <input 
                            type="tel" 
                            className="form-control" 
                            placeholder={t('pages:booking.step4.placeholder.phone')}
                            {...register('phone', { required: t('pages:booking.step4.phone') + ' harus diisi' })}
                          />
                          {errors.phone && <div className="text-danger">{errors.phone.message}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">{t('pages:booking.step4.nationality')}</label>
                          <select className="form-select" {...register('nationality')}>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Australia">Australia</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label className="form-label">{t('pages:booking.step4.emergencyContact')}</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder={t('pages:booking.step4.placeholder.emergencyContact')}
                            {...register('emergencyContact')}
                          />
                        </div>
                        

                      </div>

                      <div className="d-flex justify-content-between mt-4">
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={() => setCurrentStep(1)}
                        >
                          {t('pages:booking.back')}
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? t('pages:booking.processing') : t('pages:booking.createBooking')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {currentStep === 3 && bookingResult && (
              <div className="row">
                <div className="col-lg-8 mx-auto text-center">
                  <div className="card">
                    <div className="card-body">
                      <i className="fa fa-check-circle text-success" style={{fontSize: '4rem'}}></i>
                      <h3 className="mt-3 text-success">{t('pages:booking.success')}</h3>
                      <p className="text-muted">{t('pages:booking.successMessage')}</p>
                      
                      <div className="alert alert-info">
                        <h5>{t('pages:booking.bookingDetails')}</h5>
                        <p><strong>{t('pages:booking.bookingNumber')}:</strong> {bookingResult.bookingNumber}</p>
                        
                        <p className="mb-0"><strong>{t('pages:booking.status')}:</strong> {t('pages:booking.waitingConfirmation')}</p>
                      </div>
                      
                      <div className="alert alert-warning">
                        <p><i className="fa fa-info-circle me-2"></i>
                          {t('pages:booking.emailInfo')}
                        </p>
                      </div>
                      
                      <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => window.location.href = '/'}
                      >
                        {t('pages:booking.backToHome')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default BookingPage;
