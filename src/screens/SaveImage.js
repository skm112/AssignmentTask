/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Button, Image } from 'react-native';
import { Dimensions } from 'react-native';
import { useValidation } from 'react-native-form-validator';
const { width } = Dimensions.get('window');

const WIDTH = width;
const SaveImage = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(undefined);
    const [phone, setPhone] = useState(undefined);
    const route = useRoute();
    const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
        useValidation({
            state: { firstName, lastName, email, phone }
        });
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button color="#00bfbf" onPress={() => navigation.goBack()} title="Back" />
            ),
        });
    }, [navigation]);
    const showError = (label) => {
        return isFieldInError(label) &&
            getErrorsInField(label).map(errorMessage => (
                <Text style={{ color: 'red' }}>{errorMessage}</Text>
            ))
    }
    const onBtnPress = () => {
        console.log({ firstName, lastName, email, phone });
        const isValid = validate({
            firstName: { minlength: 3, maxlength: 20, required: true },
            lastName: { minlength: 3, maxlength: 20, required: true },
            email: { email: true, required: true },
            phone: { minlength: 10, maxlength: 10, numbers: true, required: true },
        });
        console.log(isValid)
        if (isValid) {
            saveData()
        }
    };
    const saveData = () => {
        const imgName = route.params.imgUrl.replace('http://dev3.xicom.us/xttest/shoes/', '');
        const photo = {
            uri: route.params.imgUrl,
            type: 'image/jpeg',
            name: imgName,
        };
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('user_image', photo);
        fetch('http://dev3.xicom.us/xttest/savedata.php', {
            method: 'POST',
            body: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log({ responseData: data });
                if (data.status === 'success') {
                    alert('Data saved successfully.')
                }
            })
            .catch((error) => console.log({ error }))
            .finally(() => {

            });
    };
    return (
        <ScrollView style={{ paddingVertical: 10, marginHorizontal: 20 }}>
            <Image
                source={{
                    uri: route.params.imgUrl,
                }}
                resizeMode="cover"
                onLoad={_e => console.log({ e: _e.files })
                }
                style={{
                    alignSelf: 'center',
                    height: 200,
                    width: WIDTH - 30,
                }} />
            <View style={{ height: 1, marginTop: 20 }} />
            <TextInput placeholder="First Name" onChangeText={(text) => setFirstName(text)} value={firstName} />
            {showError('firstName')}
            <View style={{ height: 1, marginTop: 20 }} />
            <TextInput placeholder="Last Name" onChangeText={(text) => setLastName(text)} value={lastName} />
            {showError('lastName')}
            <View style={{ height: 1, marginTop: 20 }} />
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} value={email} />
            {showError('email')}
            <View style={{ height: 1, marginTop: 20 }} />
            <TextInput placeholder="Mobile phone" onChangeText={(text) => setPhone(text)} value={phone} />
            {showError('phone')}
            <View style={{ height: 1, marginTop: 20 }} />
            <Button color="#00bfbf" title="Submit" onPress={() => onBtnPress()} />
        </ScrollView>
    );
};

export default SaveImage;
