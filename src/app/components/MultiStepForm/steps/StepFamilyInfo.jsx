"use client";

import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

export default function StepFamilyInfo({ onNext, onPrevious, formData, setFormData }) {
    const validationSchema = Yup.object({
        spouseName: Yup.string(),
        spouseJob: Yup.string(),
        children: Yup.array().of(
            Yup.object().shape({
                childName: Yup.string().required("Çocuk adı zorunludur"),
                birthDate: Yup.date().required("Doğum tarihi zorunludur"),
                school: Yup.string(),
            })
        ),
    });

    return (
        <>
            <div className="bg-gray-100 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
                    Aile Bilgileri
                </h2>
            </div>
                <Formik
                    initialValues={{
                        spouseName: formData.spouseName || "",
                        spouseJob: formData.spouseJob || "",
                        children: formData.children || [
                            {childName: "", birthDate: "", school: ""},
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
                            {/* Eş Adı */}
                            <div>
                                <label
                                    htmlFor="spouseName"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Eş Adı
                                </label>
                                <Field
                                    type="text"
                                    name="spouseName"
                                    id="spouseName"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Eş Adı"
                                    onChange={(e) => {
                                        setFieldValue("spouseName", e.target.value);
                                        setFormData({
                                            ...formData,
                                            spouseName: e.target.value,
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="spouseName"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Eş Mesleği */}
                            <div>
                                <label
                                    htmlFor="spouseJob"
                                    className="block text-lg font-semibold text-gray-700 mb-2"
                                >
                                    Eş Mesleği
                                </label>
                                <Field
                                    type="text"
                                    name="spouseJob"
                                    id="spouseJob"
                                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Eş Mesleği"
                                    onChange={(e) => {
                                        setFieldValue("spouseJob", e.target.value);
                                        setFormData({
                                            ...formData,
                                            spouseJob: e.target.value,
                                        });
                                    }}
                                />
                                <ErrorMessage
                                    name="spouseJob"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>

                            {/* Çocuklar */}
                            <div>
                                <label className="block text-lg font-semibold text-gray-700 mb-2">
                                    Çocuklar
                                </label>
                                <FieldArray name="children">
                                    {({remove, push}) => (
                                        <div>
                                            {values.children.map((child, index) => (
                                                <div
                                                    key={index}
                                                    className="border p-4 mb-4 rounded-lg shadow-sm"
                                                >
                                                    {/* Çocuk Adı */}
                                                    <div>
                                                        <label
                                                            htmlFor={`children.${index}.childName`}
                                                            className="block font-medium text-gray-700"
                                                        >
                                                            Çocuk Adı
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name={`children.${index}.childName`}
                                                            placeholder="Çocuk Adı"
                                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                                            onChange={(e) => {
                                                                const updatedChildren = [...values.children];
                                                                updatedChildren[index].childName = e.target.value;
                                                                setFieldValue("children", updatedChildren);
                                                                setFormData({
                                                                    ...formData,
                                                                    children: updatedChildren,
                                                                });
                                                            }}
                                                        />
                                                        <ErrorMessage
                                                            name={`children.${index}.childName`}
                                                            component="div"
                                                            className="text-red-500 text-sm mt-1"
                                                        />
                                                    </div>

                                                    {/* Doğum Tarihi */}
                                                    <div className="mt-4">
                                                        <label
                                                            htmlFor={`children.${index}.birthDate`}
                                                            className="block font-medium text-gray-700"
                                                        >
                                                            Doğum Tarihi
                                                        </label>
                                                        <Field
                                                            type="date"
                                                            name={`children.${index}.birthDate`}
                                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                                            onChange={(e) => {
                                                                const updatedChildren = [...values.children];
                                                                updatedChildren[index].birthDate = e.target.value;
                                                                setFieldValue("children", updatedChildren);
                                                                setFormData({
                                                                    ...formData,
                                                                    children: updatedChildren,
                                                                });
                                                            }}
                                                        />
                                                        <ErrorMessage
                                                            name={`children.${index}.birthDate`}
                                                            component="div"
                                                            className="text-red-500 text-sm mt-1"
                                                        />
                                                    </div>

                                                    {/* Okul Adı */}
                                                    <div className="mt-4">
                                                        <label
                                                            htmlFor={`children.${index}.school`}
                                                            className="block font-medium text-gray-700"
                                                        >
                                                            Okul Adı
                                                        </label>
                                                        <Field
                                                            type="text"
                                                            name={`children.${index}.school`}
                                                            placeholder="Okul Adı"
                                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                                            onChange={(e) => {
                                                                const updatedChildren = [...values.children];
                                                                updatedChildren[index].school = e.target.value;
                                                                setFieldValue("children", updatedChildren);
                                                                setFormData({
                                                                    ...formData,
                                                                    children: updatedChildren,
                                                                });
                                                            }}
                                                        />
                                                        <ErrorMessage
                                                            name={`children.${index}.school`}
                                                            component="div"
                                                            className="text-red-500 text-sm mt-1"
                                                        />
                                                    </div>

                                                    {/* Çocuk Sil */}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const updatedChildren = [...values.children];
                                                            updatedChildren.splice(index, 1);
                                                            setFieldValue("children", updatedChildren);
                                                            setFormData({
                                                                ...formData,
                                                                children: updatedChildren,
                                                            });
                                                            remove(index);
                                                        }}
                                                        className="text-red-500 text-sm mt-2 underline hover:text-red-700"
                                                    >
                                                        Çocuk Sil
                                                    </button>
                                                </div>
                                            ))}

                                            {/* Çocuk Ekle */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updatedChildren = [
                                                        ...values.children,
                                                        {childName: "", birthDate: "", school: ""},
                                                    ];
                                                    // setFieldValue("children", updatedChildren);
                                                    setFormData({
                                                        ...formData,
                                                        children: updatedChildren,
                                                    });
                                                    push({childName: "", birthDate: "", school: ""});
                                                }}
                                                className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600"
                                            >
                                                Çocuk Ekle
                                            </button>
                                        </div>
                                    )}
                                </FieldArray>
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
