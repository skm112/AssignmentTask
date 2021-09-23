/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const WIDTH = width;
const HomeScreen = ({ navigation }) => {
    const [imagesData, setImagesData] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [hideLoadMore, setHideLoadMore] = useState(false);
    const [loading, setLoading] = useState(false);

    const correctImgUrl = (url) => {
        return url ? url.replace('dev1.xicom.us', 'dev3.xicom.us') : url;
    };

    const fetchImages = (offset = 0) => {
        console.log({ pageNo });
        setLoading(true);
        const formData = new FormData();
        formData.append('user_id', '108');
        formData.append('offset', offset);
        formData.append('type', 'popular');
        fetch('http://dev3.xicom.us/xttest/getdata.php', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log({ responseData: data });
                if (data.status === 'success') {
                    if (data.images && data.images.length === 0) {
                        setHideLoadMore(true);
                    } else {
                        setImagesData((oldImages) => [...oldImages, ...data.images]);
                        setPageNo(prvPage => prvPage + 1);
                    }
                }
            })
            .catch((error) => console.log({ error }))
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchImages();
    }, []);
    return (<View>
        {imagesData && imagesData.length > 0 &&
            <FlatList
                data={imagesData}
                keyExtractor={(item, index) => `image-${item.id}-index-${index}`}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListFooterComponent={() => {
                    if (hideLoadMore) {
                        return null;
                    }
                    return <Button color="#00bfbf" title={loading ? 'loading...' : 'Load More'} onPress={(e) => fetchImages(pageNo)} />;
                }}
                renderItem={
                    ({ item, index }) => {
                        const imgUrl = correctImgUrl(item.xt_image);
                        return <>
                            {/* <Text style={{ alignSelf: 'center' }}>{item.id}</Text> */}
                            <Pressable onPress={() => navigation.navigate('SaveImage', { imgUrl })} >
                                <Image
                                    source={{
                                        uri: imgUrl,
                                    }}
                                    resizeMode="cover"
                                    style={{
                                        alignSelf: 'center',
                                        height: 200,
                                        width: WIDTH - 30,
                                    }} />
                            </Pressable>
                        </>;
                    }
                }
            />}
    </View>

    );
};

export default HomeScreen;
