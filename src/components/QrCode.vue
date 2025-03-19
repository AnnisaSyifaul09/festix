<template>
    <div class="qr-container">
        <qrcode-vue ref="qrCodeRef" :value="qrCode" :size="100" :margin="0" level="Q" render="svg" class="qr-code" />
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
    components: {
        QrcodeVue,
    },
    props: {
        qrCode: {
            type: String,
            default: "https://example.com/ticket/12345",
        },
    },
};
</script>

<style></style>