module.exports = {
  'bank-customertype': data => ({
  text: data.customertype,
  quick_replies: data.choices.map(choice => `<${choice.payload}> ${choice.text}`),
  typing: data.typing || '2s'
  })
}
