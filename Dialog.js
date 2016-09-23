/**
 * react-native-md-dialog
 * @author ahmed<ahmed.elhanafy95@gmail.com>
 */
import React, {
    Component,
    PropTypes
} from 'react';
import {
    View,
    TouchableWithoutFeedback,
    Dimensions,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity,
    Animated,
    Easing,
    Text,
    Platform
} from 'react-native';

const isAndroid = Platform.OS === 'android';

let {
    width: deviceWidth
} = Dimensions.get('window');

export default class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
        let animationDuration = props.animationDuration;
        this.animatedVal = new Animated.Value(0);
        this.animationTimingStart = Animated.timing(
            this.animatedVal,
            {
                toValue: 1,
                duration: animationDuration,
                easing: Easing.easing
            }
        );
        this.animationTimingEnd = Animated.timing(
            this.animatedVal,
            {
                toValue: 0,
                duration: animationDuration,
                easing: Easing.easing
            }
        );
    }
    open() {
        this.setState({ visible: true }, () => this.animationTimingStart.start());
    }
    close() {
        this.animationTimingEnd.start(() => this.setState({ visible: false }));
    }
    render() {
        let {
            actions,
            children,
            style,
            title,
            titleColor,
            dismissable,
            backgroundColor,
            maxHeight,
            width, 
        } = this.props;

        let leftActions, rightActions;
        if (actions) {
            leftActions = actions.filter(({ props }) => props.position === 'left');
            rightActions = actions.filter(({ props }) => props.position !== 'left');
        }

        return (
            this.state.visible && <Animated.View style={[styles.wrapper, { opacity: this.animatedVal }]}>
                <TouchableWithoutFeedback onPress={() => dismissable && this.close() }>
                    <View style={styles.dismissWrapper}/>
                </TouchableWithoutFeedback>
                <Animated.View style={[styles.container, style, { opacity: this.animatedVal, transform: [{ scale: 1 }], width, maxHeight, backgroundColor }]}>
                    <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
                    <View style={{ flex: 1 }}>
                        {children}
                    </View>
                {actions && <View style={styles.footer}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {leftActions}
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                            {rightActions}
                        </View>
                    </View>}
                </Animated.View>
            </Animated.View>
        );
    }
}

const Touchable = (props, state) => (
    isAndroid ? <TouchableNativeFeedback {...props} {...state}/> : <TouchableOpacity {...props} {...state}/>
)

export const DialogButton = ({ text, onPress, color, disabled, key }) => (
    <Touchable disabled={disabled} onPress={() => onPress() }>
        <View style={styles.dialogBtnContainer}>
            <Text type='medium' style={[styles.dialogBtn, { color: color? color: disabled? '#bdbdbd':'#009688' }]}>{text}</Text>
        </View>
    </Touchable>
);

DialogButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    key: PropTypes.string,
    position: PropTypes.string,
}
DialogButton.defaultProps = {
    disabled: false,
    position: 'right'
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0,
        zIndex: 9999,
        elevation: 9999,
        
    },
    dismissWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    container: {
        elevation: 5,
        minHeight: 96,
        borderRadius: 2,
        opacity: 0,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            width: 1,
            height: 2
        },
    },
    title: {
        fontSize: 20,
        margin: 16,
        fontWeight: isAndroid ? '400' : '500',
        fontFamily: isAndroid ? 'sans-serif-medium' : 'System'
    },
    footer: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 8,
        marginBottom: 8,
        marginHorizontal: 16
    },
    dialogBtnContainer: {
        minWidth: 48,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialogBtn: {
        fontWeight: isAndroid ? '400' : '500',
        fontFamily: isAndroid ? 'sans-serif-medium' : 'System',
        fontSize: isAndroid ? 14 : 13,        
    }
})

Dialog.propTypes = {
    actions: PropTypes.array,
    children: PropTypes.object,
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    title: PropTypes.string,
    titleColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    dismissable: PropTypes.bool,
    animationDuration: PropTypes.number,
    width: PropTypes.number,
    maxHeight: PropTypes.number,
}
Dialog.defaultProps = {
    title: 'Dialog',
    backgroundColor: 'white',
    titleColor: 'rgba(0,0,0,0.8)',
    dismissable: true,
    animationDuration: 200,
    width: deviceWidth - 48,
    maxHeight: 420,
}