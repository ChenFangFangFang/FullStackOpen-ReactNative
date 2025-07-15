import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#e1e4e8',
      borderRadius: 4,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      backgroundColor: 'white',
    },
    button: {
      backgroundColor: '#0366d6',
      borderRadius: 4,
      padding: 15,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(5, 'Username must be greater or equal to 1')
      .max(30, 'Username must be less than 30')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Password must be greater or equal to 5')
      .max(50, 'Password must be less than 50')
      .required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null])
     .required('Password confirm is required')
  });

const SignUpForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            passwordConfirmation: '',
        },
        validationSchema,
        onSubmit,
    });
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder='Username' value={formik.values.username} onChangeText={formik.handleChange('username')} />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
            )}
            <TextInput style={styles.input} secureTextEntry={true} placeholder='Password' value={formik.values.password} onChangeText={formik.handleChange('password')} />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
            )}
            <TextInput style={styles.input} secureTextEntry={true} placeholder='Password Confirmation' value={formik.values.passwordConfirmation} onChangeText={formik.handleChange('passwordConfirmation')} />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={{ color: 'red' }}>{formik.errors.passwordConfirmation}</Text>
            )}
            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    );
};
export default SignUpForm;