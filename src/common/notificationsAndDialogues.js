
export default {
  methods: {
    async alertMessage(title, message) {
      this.$q.dialog({
        title: title,
        message: message
      }).onOk(() => {
        // console.log('OK')
      }).onCancel(() => {
        // console.log('Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    async showNotification(message) {
      this.$q.notify({
        message: message,
        color: 'green',
        position: 'bottom-right'
      })
    }
  }
}