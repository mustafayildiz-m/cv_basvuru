"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

export default function StepPublications({ onNext, onPrevious, formData, setFormData }) {
    const validationSchema = Yup.object({
        publications: Yup.array()
            .of(
                Yup.object().shape({
                    title: Yup.string().required("Başlık zorunludur"),
                    year: Yup.number()
                        .typeError("Geçerli bir yıl giriniz")
                        .required("Yıl zorunludur"),
                    publisher: Yup.string().required("Yayınevi adı zorunludur"),
                    content: Yup.string().required("İçerik zorunludur"),
                })
            )
            .min(1, "En az bir yayın bilgisi eklemelisiniz"),
    });

    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    Yayınlar
                </h2>
            </div>
                <Formik
                    initialValues={{
                        publications: formData.publications || [
                            {title: "", year: "", publisher: "", content: ""},
                        ],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        const updatedFormData = {...formData, publications: values.publications};
                        setFormData(updatedFormData); // Merkezi form verisini güncelle
                        onNext(updatedFormData); // Sonraki adıma geç
                    }}
                >
                    {({values, setFieldValue, isSubmitting}) => (
                        <Form className="space-y-6">
                            <FieldArray name="publications">
                                {({remove, push}) => (
                                    <div>
                                        {values.publications.map((publication, index) => (
                                            <div
                                                key={index}
                                                className="border p-4 mb-4 rounded-lg shadow-sm"
                                            >
                                                {/* Başlık */}
                                                <div>
                                                    <label
                                                        htmlFor={`publications.${index}.title`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Başlık
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`publications.${index}.title`}
                                                        placeholder="Başlık"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `publications.${index}.title`,
                                                                e.target.value
                                                            );
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                publications: values.publications,
                                                            }));
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`publications.${index}.title`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Yıl */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`publications.${index}.year`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Yıl
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        name={`publications.${index}.year`}
                                                        placeholder="Yıl"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `publications.${index}.year`,
                                                                e.target.value
                                                            );
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                publications: values.publications,
                                                            }));
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`publications.${index}.year`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Yayınevi */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`publications.${index}.publisher`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Yayınevi
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`publications.${index}.publisher`}
                                                        placeholder="Yayınevi"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `publications.${index}.publisher`,
                                                                e.target.value
                                                            );
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                publications: values.publications,
                                                            }));
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`publications.${index}.publisher`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* İçerik */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`publications.${index}.content`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        İçerik
                                                    </label>
                                                    <Field
                                                        as="textarea"
                                                        name={`publications.${index}.content`}
                                                        placeholder="İçerik"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            setFieldValue(
                                                                `publications.${index}.content`,
                                                                e.target.value
                                                            );
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                publications: values.publications,
                                                            }));
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`publications.${index}.content`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Yayın Sil */}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        remove(index);
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            publications: values.publications,
                                                        }));
                                                    }}
                                                    className="text-red-500 text-sm mt-2 underline hover:text-red-700"
                                                >
                                                    Sil
                                                </button>
                                            </div>
                                        ))}

                                        {/* Yeni Yayın Ekle */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                push({title: "", year: "", publisher: "", content: ""});
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    publications: [
                                                        ...values.publications,
                                                        {title: "", year: "", publisher: "", content: ""},
                                                    ],
                                                }));
                                            }}
                                            className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600"
                                        >
                                            Yeni Yayın Ekle
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
