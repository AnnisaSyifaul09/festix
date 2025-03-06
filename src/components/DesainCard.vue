<template>
  <div class="card">
    <img :src="image" :alt="title">
    <div class="card-body">
      <h2 class="card-title">{{ title }}</h2>
      <div class="details">
        <p>
          <IconDate class="icon"/> {{ date }}
        </p>
        <p>
          <IconTime class="icon"/> {{ time }}
        </p>
        <p>
          <IconLocation class="icon"/> {{ location }}
        </p>
      </div>
      <div class="footer">
        <p class="font-bold text-lg">VIP 1 | 10</p>
        <img :src="qrCode" alt="QR Code">
      </div>
    </div>
  </div>
</template>

<script>
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";

export default {
  props: {
    image: String,
    title: String,
    date: String,
    time: String,
    location: String,
    qrCode: String,
  },
  components: {
    IconDate,
    IconTime,
    IconLocation,
  }
};
</script>

<style>
.card {
  background: white;
  color: black;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  max-width: 320px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  min-height: 450px;
}
.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.card-body {
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.badge {
  background: black;
  color: white;
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 999px;
  display: inline-block;
  margin-top: 8px;
}
.details {
  margin-top: 8px;
  font-size: 0.875rem;
}
.details p {
  display: flex;
  align-items: center;
  gap: 8px;
}
.icon {
  width: 20px;
  height: 20px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}
.footer img {
  width: 80px;
  height: 80px;
}
</style>
