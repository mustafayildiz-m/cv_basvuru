"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

export default function StepTraining({ onNext, onPrevious, formData, setFormData }) {
    const validationSchema = Yup.object({
        trainings: Yup.array()
            .of(
                Yup.object().shape({
                    courseName: Yup.string().required("Kurs adı zorunludur"),
                    institution: Yup.string().required("Kurum adı zorunludur"),
                    year: Yup.number()
                        .required("Yıl zorunludur")
                        .min(1900, "Geçerli bir yıl girin")
                        .max(new Date().getFullYear(), "Geçerli bir yıl girin"),
                })
            )
            .min(1, "En az bir eğitim bilgisi eklemelisiniz"),
    });

    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    Eğitimler
                </h2>
            </div>
                <Formik
                    initialValues={{
                        trainings: formData.trainings || [
                            {courseName: "", institution: "", year: ""},
                        ],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const updatedFormData = {...formData, trainings: values.trainings};
                        setFormData(updatedFormData); // Merkezi state'i güncelle
                        onNext(updatedFormData); // Sonraki adıma geç
                    }}
                >
                    {({values, setFieldValue, isSubmitting}) => (
                        <Form className="space-y-6">
                            <FieldArray name="trainings">
                                {({remove, push}) => (
                                    <div>
                                        {values.trainings.map((training, index) => (
                                            <div
                                                key={index}
                                                className="border p-4 mb-4 rounded-lg shadow-sm"
                                            >
                                                {/* Kurs Adı */}
                                                <div>
                                                    <label
                                                        htmlFor={`trainings.${index}.courseName`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Kurs Adı
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`trainings.${index}.courseName`}
                                                        placeholder="Kurs Adı"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `trainings.${index}.courseName`,
                                                                e.target.value
                                                            );
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                trainings: values.trainings,
                                                            }));
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`trainings.${index}.courseName`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Kurum */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`trainings.${index}.institution`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Kurum
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`trainings.${index}.institution`}
                                                        placeholder="Kurum"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `trainings.${index}.institution`,
                                                                e.target.value
                                                            );
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                trainings: values.trainings,
                                                            }));
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`trainings.${index}.institution`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Yıl */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`trainings.${index}.year`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Yıl
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        name={`trainings.${index}.year`}
                                                        placeholder="Yıl"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `trainings.${index}.year`,
                                                                e.target.value
                                                            );
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                trainings: values.trainings,
                                                            }));
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`trainings.${index}.year`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Eğitim Sil */}
                                                {values.trainings.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            remove(index);
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                trainings: values.trainings,
                                                            }));
                                                        }}
                                                        className="text-red-500 text-sm mt-2 underline hover:text-red-700"
                                                    >
                                                        Sil
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {/* Yeni Eğitim Ekle */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                push({courseName: "", institution: "", year: ""});
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    trainings: [...values.trainings, {
                                                        courseName: "",
                                                        institution: "",
                                                        year: ""
                                                    }],
                                                }));
                                            }}
                                            className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600"
                                        >
                                            Yeni Eğitim Ekle
                                        </button>
                                    </div>
                                )}
                            </FieldArray>

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
