import { Text, TextInput, View, Pressable, StyleSheet } from 'react-native';
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
      errorText: {
        color: '#d73a4a',
        fontSize: 14,
        marginBottom: 10,
        marginTop: -10,
    }
});

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required'),
  ownerName: yup.string().required('Owner name is required'),
  rating: yup.number().min(0).max(100).integer().required('Rating is required'),
  text: yup.string().nullable(),
});
const ReviewForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
          repositoryName: '',
          ownerName: '',
          rating: '', 
          text: '',
        },
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input} 
                placeholder='Repository name' 
                value={formik.values.repositoryName} 
                onChangeText={formik.handleChange('repositoryName')}
                onBlur={formik.handleBlur('repositoryName')}  // 添加这行
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
            )}

            <TextInput 
                style={styles.input} 
                placeholder='Owner name' 
                value={formik.values.ownerName} 
                onChangeText={formik.handleChange('ownerName')}
                onBlur={formik.handleBlur('ownerName')}  
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
            )}

            <TextInput 
                style={styles.input} 
                placeholder='Rating' 
                value={formik.values.rating.toString()} 
                onChangeText={formik.handleChange('rating')}
                onBlur={formik.handleBlur('rating')}  
                keyboardType="numeric"  
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={styles.errorText}>{formik.errors.rating}</Text>
            )}

            <TextInput 
                style={styles.input} 
                multiline={true}
                placeholder='Review' 
                value={formik.values.text} 
                onChangeText={formik.handleChange('text')}
                onBlur={formik.handleBlur('text')}  
            />
            {formik.touched.text && formik.errors.text && (
                <Text style={styles.errorText}>{formik.errors.text}</Text>
            )}

            <Pressable 
                style={styles.button} 
                onPress={formik.handleSubmit} 
            >
                <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
        </View>
    );
};



export default ReviewForm;