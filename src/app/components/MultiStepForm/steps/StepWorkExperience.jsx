"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

export default function StepWorkExperience({ onNext, onPrevious, formData, setFormData }) {
    const validationSchema = Yup.object({
        workExperience: Yup.array()
            .of(
                Yup.object().shape({
                    institutionName: Yup.string().required("Şirket adı zorunludur"),
                    position: Yup.string().required("Pozisyon adı zorunludur"),
                    duration: Yup.string().required("Çalışma süresi zorunludur"),
                    reasonForLeaving: Yup.string().required("Ayrılma nedeni zorunludur"),
                })
            )
            .min(1, "En az bir iş tecrübesi eklemelisiniz"),
    });

    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    İş Tecrübeleri
                </h2>
            </div>
                <Formik
                    initialValues={{
                        workExperience: formData.workExperience || [
                            {
                                institutionName: "",
                                position: "",
                                duration: "",
                                reasonForLeaving: "",
                            },
                        ],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        setFormData({...formData, ...values});
                        onNext(values);
                    }}
                >
                    {({values, setFieldValue, isSubmitting}) => (
                        <Form className="space-y-6">
                            <FieldArray name="workExperience">
                                {({remove, push}) => (
                                    <div>
                                        {values.workExperience.map((experience, index) => (
                                            <div
                                                key={index}
                                                className="border p-4 mb-4 rounded-lg shadow-sm"
                                            >
                                                {/* Şirket Adı */}
                                                <div>
                                                    <label
                                                        htmlFor={`workExperience.${index}.institutionName`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Şirket Adı
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`workExperience.${index}.institutionName`}
                                                        placeholder="Şirket Adı"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedExperience = [...values.workExperience];
                                                            updatedExperience[index].institutionName = e.target.value;
                                                            setFieldValue("workExperience", updatedExperience);
                                                            setFormData({
                                                                ...formData,
                                                                workExperience: updatedExperience,
                                                            });
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`workExperience.${index}.institutionName`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Pozisyon */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`workExperience.${index}.position`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Pozisyon
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`workExperience.${index}.position`}
                                                        placeholder="Pozisyon Adı"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedExperience = [...values.workExperience];
                                                            updatedExperience[index].position = e.target.value;
                                                            setFieldValue("workExperience", updatedExperience);
                                                            setFormData({
                                                                ...formData,
                                                                workExperience: updatedExperience,
                                                            });
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`workExperience.${index}.position`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Çalışma Süresi */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`workExperience.${index}.duration`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Çalışma Süresi
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`workExperience.${index}.duration`}
                                                        placeholder="Örn: 2 yıl, 6 ay"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedExperience = [...values.workExperience];
                                                            updatedExperience[index].duration = e.target.value;
                                                            setFieldValue("workExperience", updatedExperience);
                                                            setFormData({
                                                                ...formData,
                                                                workExperience: updatedExperience,
                                                            });
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`workExperience.${index}.duration`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* Ayrılma Nedeni */}
                                                <div className="mt-4">
                                                    <label
                                                        htmlFor={`workExperience.${index}.reasonForLeaving`}
                                                        className="block font-medium text-gray-700"
                                                    >
                                                        Ayrılma Nedeni
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name={`workExperience.${index}.reasonForLeaving`}
                                                        placeholder="Ayrılma Nedeni"
                                                        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        onChange={(e) => {
                                                            const updatedExperience = [...values.workExperience];
                                                            updatedExperience[index].reasonForLeaving = e.target.value;
                                                            setFieldValue("workExperience", updatedExperience);
                                                            setFormData({
                                                                ...formData,
                                                                workExperience: updatedExperience,
                                                            });
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`workExperience.${index}.reasonForLeaving`}
                                                        component="div"
                                                        className="text-red-500 text-sm mt-1"
                                                    />
                                                </div>

                                                {/* İş Tecrübesi Sil */}
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updatedExperience = [...values.workExperience];
                                                            updatedExperience.splice(index, 1);
                                                            setFieldValue("workExperience", updatedExperience);
                                                            setFormData({
                                                                ...formData,
                                                                workExperience: updatedExperience,
                                                            });
                                                            remove(index);
                                                        }}
                                                        className="text-red-500 text-sm mt-2 underline hover:text-red-700"
                                                    >
                                                        Sil
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {/* Yeni İş Tecrübesi Ekle */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updatedExperience = [
                                                    ...values.workExperience,
                                                    {
                                                        institutionName: "",
                                                        position: "",
                                                        duration: "",
                                                        reasonForLeaving: "",
                                                    },
                                                ];
                                                // setFieldValue("workExperience", updatedExperience);
                                                setFormData({
                                                    ...formData,
                                                    workExperience: updatedExperience,
                                                });
                                                push({
                                                    institutionName: "",
                                                    position: "",
                                                    duration: "",
                                                    reasonForLeaving: "",
                                                });
                                            }}
                                            className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600"
                                        >
                                            Yeni İş Tecrübesi Ekle
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
