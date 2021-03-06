const {
  contentElements,
  contentRenderers,
  actions: builtinActions,
  setup: setupBuiltins
} = require('@botpress/builtins')

const registerCustom = require('./custom')

module.exports = async bp => {
  // This bot template includes a couple of built-in elements and actions
  // Please see the "@botpress/builtins" package to know more
  //console.log("Registering BuiltIns");
  await registerBuiltin(bp)

  // Register custom actions, elements and renderers
  //console.log("Registering Custom Renderers");
  await registerCustom(bp)

  // Train the NLU model if using the Native NLU Engine
  if (bp.nlu && bp.nlu.provider && bp.nlu.provider.name === 'native') {
    await bp.nlu.provider.sync()
  }

  const webchat = {
    botName: 'Bank Bot',
    botAvatarUrl: 'https://i1.wp.com/www.leagueteamupdates.com/wp-content/uploads/2017/10/Italy-F.C-Team.jpg', // You can provide a URL here
    botConvoTitle: 'Money Bank!!',
    botConvoDescription: "This is Loan Processing Bot!",
    backgroundColor: '#ffffff',
    textColorOnBackground: '#666666',
    foregroundColor: '#000000',
    textColorOnForeground: '#ffffff'
  }

  bp.createShortlink('chat', '/lite', {
    m: 'channel-web',
    v: 'fullscreen',
    options: JSON.stringify({ config: webchat })
  })

  bp.logger.info(`------------`)
  bp.logger.info(`Webchat available at ${bp.botfile.botUrl}/s/chat`)
  bp.logger.info(`------------`)

  ////////////////////////////
  /// Conversation Management
  ////////////////////////////

  // All events that should be processed by the Flow Manager
  bp.hear({ type: /visit/i }, async (event, next) => {
    bp.renderers.sendToUser(event, '#builtin_text', { text: 'Welcome to Money Bank!!!', typing: true })
    next()
  })


  bp.hear({ type: /bp_dialog_timeout|text|message|quick_reply|action/i }, (event, next) => {
    if (event.type === 'action' && event.platform === 'slack' || event.type !== 'action') {
      bp.dialogEngine.processMessage(event.sessionId || event.user.id, event).then()
    }
  })

}

async function registerBuiltin(bp) {
  await setupBuiltins(bp)

  // Register all the built-in content elements
  // Such as Carousel, Text, Choice etc..
  for (const schema of Object.values(contentElements)) {
    await bp.contentManager.loadCategoryFromSchema(schema)
  }

  await bp.contentManager.recomputeCategoriesMetadata()

  // Register all the renderers for the built-in elements
  for (const renderer of Object.keys(contentRenderers)) {
    bp.renderers.register(renderer, contentRenderers[renderer])
  }

  // Register all the built-in actions
  bp.dialogEngine.registerActions(builtinActions)
}
