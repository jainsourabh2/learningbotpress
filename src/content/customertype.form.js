module.exports = {
  id: 'customertype',
  title: 'Customer Type',
  renderer: '#bank-customertype',
  jsonSchema: {
    title: 'Customer Type',
    description: 'Different types of customer using the application i.e. New or Existing',
    type: 'object',
    required: ['customertype'],
    properties:{
      customertype:{
        title: 'Customer Type',
        type: 'array',
        items:{
          type: 'string',
          default: ''
        }
      }
    }
  },

  uiSchema: {
    customertype: {
      'ui:options':{
        orderable: false
      }
    }
  },

  computeData: formData => {
    const customertypechoices = formData.customertype.map(i => ({payload: 'CustomerType', text: i}))
    const choices = [...customertypechoices]

    return {
      choices: choices
    }
  }
}
