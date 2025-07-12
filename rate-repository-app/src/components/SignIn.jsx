import Text from './Text';
import {TextInput,View,Pressable,StyleSheet} from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be greater or equal to 1')
    .required('Username is required'),
  password: yup
    .string()
    .min(1, 'Password must be greater or equal to 1')
    .required('Password is required'),
});


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

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data  = await signIn({ username, password });
  
      console.log("authentication data:",data?.authenticate?.accessToken);
    } catch (e) {
      console.log(e);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });
  return (
  <View style={styles.container}>
    <TextInput
    placeholder="Username"
    value={formik.values.username}
    onChangeText={formik.handleChange('username')}
    style={styles.input}
    />
     {formik.touched.username && formik.errors.username && (
  <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
 )}
    <TextInput
    placeholder="Password"
    value={formik.values.password}
    onChangeText={formik.handleChange('password')}
    secureTextEntry={true}
    style={styles.input}
    />
    {formik.touched.password && formik.errors.password && (
  <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
 )}
    <Pressable onPress={formik.handleSubmit} style={styles.button}>
      <Text style={styles.buttonText}>Sign in</Text>
    </Pressable>
  </View>
  )
};

export default SignIn;