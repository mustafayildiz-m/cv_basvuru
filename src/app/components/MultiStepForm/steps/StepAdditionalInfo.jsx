"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function StepAdditionalInfo({ onNext, onPrevious, formData, setFormData }) {
    const validationSchema = Yup.object({
        pedagogicalCert: Yup.string().required("Pedagojik sertifika bilgisi zorunludur"),
        internship: Yup.string().required("Staj bilgisi zorunludur"),
        teachingExperience: Yup.string().required("Öğretmenlik tecrübesi zorunludur"),
        experienceState: Yup.string().required("Tecrübe durumu zorunludur"),
        extraNotes: Yup.string(),
    });

    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    Ek Bilgiler
                </h2>
            </div>
                <Formik
                    initialValues={{
                        pedagogicalCert: formData.additionalInfo.pedagogicalCert || "",
                        internship: formData.additionalInfo.internship || "",
                        teachingExperience: formData.additionalInfo.teachingExperience || "",
                        experienceState: formData.additionalInfo.experienceState || "",
                        extraNotes: formData.additionalInfo.extraNotes || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const updatedFormData = {
                            ...formData,
                            additionalInfo: {...values},
                        };
                        setFormData(updatedFormData); // Merkezi state'i güncelle
                        onNext(updatedFormData); // Sonraki adıma geç
                    }}
                >
                    {({values, setFieldValue, isSubmitting}) => (
                        <Form className="space-y-6">
                            {/* Pedagojik Sertifika */}
                            <div>
                                <label
                                    htmlFor="pedagogicalCert"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Pedagojik Sertifika
                                </label>
                                <Field
                                    as="select"
                                    name="pedagogicalCert"
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => {
                                        setFieldValue("pedagogicalCert", e.target.value);
                                        setFormData({
                                            ...formData,
                                            additionalInfo: {
                                                ...formData.additionalInfo,
                                                pedagogicalCert: e.target.value,
                                            },
                                        });
                                    }}
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="Var">Var</option>
                                    <option value="Yok">Yok</option>
                                </Field>
                                <ErrorMessage
                                    name="pedagogicalCert"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Staj Bilgisi */}
                            <div>
                                <label
                                    htmlFor="internship"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Staj Bilgisi
                                </label>
                                <Field
                                    as="select"
                                    name="internship"
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => {
                                        setFieldValue("internship", e.target.value);
                                        setFormData({
                                            ...formData,
                                            additionalInfo: {
                                                ...formData.additionalInfo,
                                                internship: e.target.value,
                                            },
                                        });
                                    }}
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="Evet">Evet</option>
                                    <option value="Hayır">Hayır</option>
                                </Field>
                                <ErrorMessage
                                    name="internship"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Öğretmenlik Tecrübesi */}
                            <div>
                                <label
                                    htmlFor="teachingExperience"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Öğretmenlik Tecrübesi
                                </label>
                                <Field
                                    type="text"
                                    name="teachingExperience"
                                    placeholder="Örn: 5 Yıl"
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => {
                                        setFieldValue("teachingExperience", e.target.value);
                                        setFormData({
                                            ...formData,
                                            additionalInfo: {
                                                ...formData.additionalInfo,
                                                teachingExperience: e.target.value,
                                            },
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="teachingExperience"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Tecrübe Durumu */}
                            <div>
                                <label
                                    htmlFor="experienceState"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Tecrübe Durumu
                                </label>
                                <Field
                                    as="select"
                                    name="experienceState"
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => {
                                        setFieldValue("experienceState", e.target.value);
                                        setFormData({
                                            ...formData,
                                            additionalInfo: {
                                                ...formData.additionalInfo,
                                                experienceState: e.target.value,
                                            },
                                        });
                                    }}
                                >
                                    <option value="">Seçiniz</option>
                                    <option value="Özel">Özel</option>
                                    <option value="Devlet">Devlet</option>
                                </Field>
                                <ErrorMessage
                                    name="experienceState"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Ek Notlar */}
                            <div>
                                <label
                                    htmlFor="extraNotes"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Ek Notlar
                                </label>
                                <Field
                                    as="textarea"
                                    name="extraNotes"
                                    placeholder="Ek notlarınızı yazın..."
                                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onChange={(e) => {
                                        setFieldValue("extraNotes", e.target.value);
                                        setFormData({
                                            ...formData,
                                            additionalInfo: {
                                                ...formData.additionalInfo,
                                                extraNotes: e.target.value,
                                            },
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="extraNotes"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Butonlar */}
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={onPrevious}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-600"
                                >
                                    Geri
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Sonraki
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </>
            );
            }
