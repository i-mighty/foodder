import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { Container, Header, Left, Button, Text, Icon, Body, Content, List, ListItem, Right, Thumbnail, Title } from 'native-base';
import { CustomCachedImage } from 'react-native-img-cache';
import moment from 'moment';
import AnimatedComponent from '../AnimatedComponent';

const datas = [
    'Simon Mignolet',
    'Nathaniel Clyne',
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
    'Emre Can',
    'Joe Allen',
    'Phil Coutinho',
];

class CustomersComponent extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            menu: datas
        };
    }
}