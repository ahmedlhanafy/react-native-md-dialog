/**
 * react-native-md-dialog
 * @author ahmed<ahmed.elhanafy95@gmail.com>
 */

import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ToolbarAndroid,
    StatusBar,
    Platform,
    ScrollView
} from 'react-native';

import Dialog, {
    DialogButton
} from 'react-native-md-dialog';

const isAndroid = Platform.OS === 'android';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            numberOfClicks: 0
        }
    }
    renderDialogWithoutBtns() {
        return (
            <Dialog ref='dialog0'>
                <View style={styles.dialogConatiner}>
                    <Text >
                        I'm a dialog with no buttons
                    </Text>
                </View>
            </Dialog>
        )
    }
    renderDialogWithCloseBtn() {
        return (
            <Dialog actions={[<DialogButton key="3" text='CLOSE' onPress={() => this.refs.dialog1.close()} position='right'/>]} ref='dialog1'>
                <View style={styles.dialogConatiner}>
                    <Text >
                        I'm a dialog with a close button
                    </Text>
                </View>
            </Dialog>
        )
    }
    renderDialogWithMultipleBtns() {
        return (
            <Dialog 
                actions={[
                    <DialogButton key="4" text='INCREMENT' onPress={() => this.setState({ numberOfClicks: this.state.numberOfClicks + 1})}/>,
                    <DialogButton key="5" text='OK' onPress={() => this.refs.dialog2.close()}/>,
                    <DialogButton key="6" text='DISABLED' disabled={true} position='left' />
                ]} 
                ref='dialog2'>
                <View style={styles.dialogConatiner}>
                    <Text >
                        I'm a dialog with multiple btns, {this.state.numberOfClicks}
                    </Text>
                 </View>
            </Dialog>
        )
    }
    renderDialogCustomStyle(){
        return (
                    
            <Dialog 
                backgroundColor='#3f51b5' 
                titleColor='#d81b60'
                actions={[
                    <DialogButton key="7" text='DISABLED' disabled={true} position='left' color='#ffeb3b' />,            
                    <DialogButton  key="8" text='OK' onPress={() => this.refs.dialog3.close()} color='#d81b60'/>
                ]} 
                ref='dialog3'>
                <View style={styles.dialogConatiner}>
                    <Text>Dialogs with custom styles</Text>
                </View>
            </Dialog>
        );
    }
    renderDialogWithCustomWidth(){
        return (
                    
            <Dialog 
                actions={[
                    <DialogButton key="9" text='DONE' onPress={() => this.refs.dialog4.close()} />
                ]} 
                ref='dialog4'
                width={240}>
                <View style={styles.dialogConatiner}>
                    <Text>Dialog with custom width</Text>
                </View>
            </Dialog>
        );
    }
    renderDialogWithScrollableContent(){
        return (
            <Dialog 
                actions={[
                    <DialogButton key="10" text='DONE' onPress={() => this.refs.dialog5.close()} />
                ]} 
                ref='dialog5'
                maxHeight={280}>
                <ScrollView>
                    <View style={styles.dialogConatiner}>
                        <Text style={{ color: 'rgba(0,0,0,0.8)', fontSize: 16 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18}}>Build Native Mobile Apps using JavaScript and React {'\n'}</Text>
                            React Native lets you build mobile apps using only JavaScript. {'\n'}
                            It uses the same design as React, letting you compose a rich mobile UI from declarative components. {'\n'}
                            <Text style={{ fontWeight: 'bold', fontSize: 18}}>A React Native App is a Real Mobile App {'\n'}</Text>
                            With React Native, you don't build a “mobile web app”, an “HTML5 app”, or a “hybrid app”. {'\n'}
                            You build a real mobile app that's indistinguishable from an app built using Objective-C or Java. {'\n'} 
                            React Native uses the same fundamental UI building blocks as regular iOS and Android apps. You just put those building blocks together using JavaScript and React. {'\n'}
                            <Text style={{ fontWeight: 'bold', fontSize: 18}}>Don't Waste Time Recompiling {'\n'} </Text>
                            React Native lets you build your app faster. Instead of recompiling, you can reload your app instantly. {'\n'} 
                            With hot reloading, you can even run new code while retaining your application state. Give it a try - it's a magical experience.{'\n'}
                        </Text>
                    </View>
                </ScrollView>
            </Dialog>
        );
    }
    renderAndroidToolbar(){
        return (
            <ToolbarAndroid 
                style={{ backgroundColor: '#3F51B5', height: 56, elevation: 5 }}
                titleColor='white' 
                title='Dialog Examples'/>
        );
    }
    renderIOSToolbar(){
        return (
            <View style={styles.IOSToolbar}>
                <View style={{ backgroundColor: '#303F9F', height: 20}}/>
                <Text style={styles.IOSToolbarText}>Dialog Examples</Text>
            </View>
        );
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'lightgrey'}}>
                <StatusBar barStyle='light-content' backgroundColor='#303F9F'/>
                {isAndroid? this.renderAndroidToolbar() : this.renderIOSToolbar() }
                <View style={styles.container}>                
                    <TouchableOpacity style={ styles.button } onPress={() => this.refs.dialog0.open() }>
                        <Text style={styles.buttonText}>
                            Dialog with no buttons
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.button } onPress={() => this.refs.dialog1.open() }>
                        <Text style={styles.buttonText}>
                            Dialog with close button
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.button } onPress={() => this.refs.dialog2.open() }>
                        <Text style={styles.buttonText}>
                            Dialog with multiple buttons
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.button } onPress={() => this.refs.dialog3.open() }>
                        <Text style={styles.buttonText}>
                            Dialog with custom style
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.button } onPress={() => this.refs.dialog4.open() }>
                        <Text style={styles.buttonText}>
                            Dialog with custom width
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.button } onPress={() => this.refs.dialog5.open() }>
                        <Text style={styles.buttonText}>
                            Dialog with scrollable content
                        </Text>
                    </TouchableOpacity>
                </View>                
                {this.renderDialogWithoutBtns()}
                {this.renderDialogWithCloseBtn()}
                {this.renderDialogWithMultipleBtns()}
                {this.renderDialogCustomStyle()}                
                {this.renderDialogWithCustomWidth()}          
                {this.renderDialogWithScrollableContent()}                      
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12
    }, 
    button: {
        backgroundColor: '#FFC107',
        padding: 8,
        height: 50,
        margin: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 2
        },
    }, 
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    IOSToolbar: {
        backgroundColor: '#3F51B5', 
        height: 72,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 2
        },
    },
    IOSToolbarText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginHorizontal: 16,
        marginTop: 14
    }, 
    dialogConatiner: {
        paddingHorizontal: 16
    }
});