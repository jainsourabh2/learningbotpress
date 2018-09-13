/**
 * Description of the action goes here
 * @param  {String} params.name=value Description of the parameter goes here
 * @param  {Number} [params.age] Optional parameter
 */
async function yourCustomAction(state, event, params) {
  return state
}

module.exports = {
  startGame: async (state, event) => {
    console.log("####################################################################");
    console.log(event.text);
    const val = event.text;
    return {
      ...state, // we clone the existing state
      val // setting the value typed by user
    }
  },
 }
