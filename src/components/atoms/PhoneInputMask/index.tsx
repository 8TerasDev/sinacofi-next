import React, { useCallback } from 'react';
import { IMaskInput } from 'react-imask';

interface PhoneInputMaskProps {
  unmask?: boolean;
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const PhoneInputMask = React.forwardRef<HTMLInputElement, PhoneInputMaskProps>(
  (props, ref) => {
    const { onChange, unmask, ...rest } = props;

    const handleChange = useCallback((value: any) => {
      onChange({ target: { name: props.name, value } })
    }, [onChange])

    return (
      <IMaskInput
        {...rest}
        overwrite
        unmask={unmask}
        inputRef={ref}
        onAccept={handleChange}
        definitions={{ '#': /[1-9]/ }}
        mask={"(##) " + Array(13).fill(0).join('')}
      />
    );
  },
);

PhoneInputMask.defaultProps = {
  unmask: true,
}

export default PhoneInputMask