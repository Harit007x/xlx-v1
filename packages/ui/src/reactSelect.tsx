import React from 'react'
import makeAnimated from 'react-select/animated'
import CreatableSelect from 'react-select/creatable'

// interface IReactSelectProps{
//     components: any,
//     options: any,
//     value: any,
//     onChange: any,
// }

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'transparent',
    borderColor: 'rgba(235, 235, 235, 0.1)',
    '&:hover': {
      borderColor: state.isFocused ? 'rgba(235, 235, 235, 0.1)' : 'rgba(235, 235, 235, 0.1)',
    },
    borderRadius: '6px',
    boxShadow: state.isFocused ? 'yellow' : null,
    outline: state.isFocused ? 'red' : null,
    outlineOffset: '2px',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderRadius: '6px',
    color: state.isSelected ? 'white' : 'black',
    '&:hover': {
      backgroundColor: state.isFocused ? 'lightgrey' : null,
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#27272A',
    color: 'white',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: 'white',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: 'white',
    ':hover': {
      backgroundColor: 'darkgrey',
      color: 'white',
    },
  }),
}

export const CustomReactSelect = ({ ...props }) => {
  const animatedComponents = makeAnimated()

  return <CreatableSelect {...props} isMulti components={animatedComponents} styles={customStyles} />
}
