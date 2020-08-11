import * as yup from 'yup';

const AddPerformanceSchema = yup.object().shape({
    subject: yup
        .string()
        .min(6)
        .max(100)
        .required(),
    title: yup
        .string()
        .min(6)
        .max(100)
        .required(),
    body: yup
        .string()
        .min(6)
        .max(1000)
        .required()
});


export default AddPerformanceSchema