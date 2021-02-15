import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
// extend from native TextInput props
//type Props = React.ComponentProps<typeof TextInput>;
const TextField = (props) => {
  /*
   ** spread operator helps to extract style prop and assign
   ** any remaining props to the `restOfProps` variable.
   ** it is pretty handy here as we need to support
   ** all the props the native TextInput component has.
   */
  const { style, ...restOfProps } = props;
  return <TextInput style={[style, styles.input]} {...restOfProps} />;
};
const styles = StyleSheet.create({
  input: {
    padding: 24,
    borderColor: '#B9C4CA',
    borderWidth: 1,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor:"#fff"
  }
});
export default TextField;