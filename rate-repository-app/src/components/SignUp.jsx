import SignUpForm from './SignUpForm';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
    errorContainer: {
        padding: 20,
        backgroundColor: '#ffebee',
        marginBottom: 10,
    },
    errorText: {
        color: '#d32f2f',
        fontSize: 16,
    }
});

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const navigate = useNavigate();
    const [error, setError] = React.useState('');

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            setError('');  
            console.log('Starting sign up for:', username);
            const result = await signUp({ 
                variables: { 
                    user: { 
                        username, 
                        password 
                    } 
                } 
            });
            console.log('Sign up result:', result);
            
            try {
                console.log('Attempting sign in for:', username);
                const { data: signInData } = await signIn({ 
                    username,  
                    password
                });
                console.log('Sign in result:', signInData);
                
                if (signInData?.authenticate?.accessToken) {
                    navigate('/');
                } else {
                    setError('Login failed after successful registration');
                }
            } catch (signInError) {
                console.log('Sign in error:', signInError);
                setError('Failed to login after registration: ' + signInError.message);
            }
        } catch (e) {
            console.log('Sign up error:', e);
            setError(e.message || 'An error occurred during sign up');
        }
    };

    return (
        <View>
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
            <SignUpForm onSubmit={onSubmit} />
        </View>
    );
};

export default SignUp;