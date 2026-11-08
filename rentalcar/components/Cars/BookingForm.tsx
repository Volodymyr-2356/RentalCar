"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import styles from "./BookingForm.module.css";

import { createBookingRequest, type BookingRequest } from "@/lib/api/booking";

interface BookingFormProps {
  carId: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  comment: Yup.string().max(
    500,
    "Comment must be no longer than 500 characters",
  ),
});

export default function BookingForm({ carId }: BookingFormProps) {
  const formik = useFormik<BookingRequest>({
    initialValues: {
      name: "",
      email: "",
      comment: "",
    },

    validationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        await createBookingRequest(carId, {
          name: values.name.trim(),
          email: values.email.trim(),
          comment: values.comment.trim(),
        });

        toast.success("Booking request sent successfully!");
        resetForm();
      } catch {
        toast.error("Failed to send booking request. Please try again.");
      }
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <h2 className={styles.title}>Book your car now</h2>

      <p className={styles.description}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={styles.field}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name*"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.name && formik.errors.name && (
          <p className={styles.error}>{formik.errors.name}</p>
        )}
      </div>

      <div className={styles.field}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email*"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.email && formik.errors.email && (
          <p className={styles.error}>{formik.errors.email}</p>
        )}
      </div>

      <div className={styles.field}>
        <textarea
          className={styles.textarea}
          name="comment"
          placeholder="Comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.comment && formik.errors.comment && (
          <p className={styles.error}>{formik.errors.comment}</p>
        )}
      </div>

      <button
        className={styles.button}
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}
