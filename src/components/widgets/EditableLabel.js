import React from 'react'
import PropTypes from 'prop-types'

class EditableLabel extends React.Component {
  state = {text: ''}

  getText = el => {
    return el.innerText
  }

  onTextChange = ev => {
    if(this.props.maxLength !== undefined && this.refDiv.innerText.length > this.props.maxLength){
      this.refDiv.innerText = this.refDiv.innerText.substring(0, this.props.maxLength);
    }
    this.setState({text: this.refDiv.innerText})
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.refDiv.focus()
    }
  }

  onBlur = () => {
    this.props.onChange(this.state.text)
  }

  onPaste = ev => {
    ev.preventDefault()
    const text = ev.clipboardData.getData('text')
    document.execCommand('insertText', false, text)
  }

  getClassName = () => {
    const placeholder = this.state.text === '' ? 'comPlainTextContentEditable--has-placeholder' : ''
    return `comPlainTextContentEditable ${placeholder}`
  }

  onKeyDown = (e) => {
    if(e.keyCode === 13) {
      this.props.onChange(this.state.value)
      this.refDiv.blur()
      e.preventDefault()
    }
    if(e.keyCode === 27) {
      this.refDiv.value = this.props.value
      this.setState({value: this.props.value})
      // this.refDiv.blur()
      e.preventDefault()
      e.stopPropagation()
    }
    this.onTextChange(e);
  }

  render() {
    return (
      <div
        ref={ref => (this.refDiv = ref)}
        contentEditable="true"
        className={this.getClassName()}
        onPaste={this.onPaste}
        onBlur={this.onBlur}
        onInput={this.onTextChange}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onTextChange}
        placeholder={this.props.placeholder}
      />
    )
  }
}

EditableLabel.defaultProps = {
  onChange: () => {},
  placeholder: '',
  autoFocus: false
}
EditableLabel.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number
}

export default EditableLabel
