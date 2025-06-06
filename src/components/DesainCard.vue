<template>
  <div class="w-sm shadow-xl shadow-indigo-500/50 rounded-lg overflow-hidden ">
    <img class="w-full aspect-video object-cover" :src="image_link" :alt="title">
    <div class="card-body">
      <h2 class="text-3xl font-bold text-indigo-900">{{ title }}</h2>
      <p class="font-semibold text-sm text-indigo-900">
        {{ qrCode }}
      </p>
      <div class="details">
        <p>
          <IconDate class="icon" /> {{ date }}
        </p>
        <p>
          <IconTime class="icon" /> {{ time }}
        </p>
        <p>
          <IconLocation class="icon" /> {{ location }}
        </p>

      </div>
      <div class="flex justify-between items-end mt-15">
        <div class="">
          <p class="font-bold text-lg">{{ category }}</p>
          <p class="font-bold text-lg">{{ seatNumber }}</p>

        </div>
        <QrCode :qrCode="qrCode" />
      </div>

    </div>
  </div>
</template>

<script>
import IconDate from "@/components/icons/IconDate.vue";
import IconTime from "@/components/icons/IconTime.vue";
import IconLocation from "@/components/icons/IconLocation.vue";
import QrCode from "@/components/QrCode.vue";

const BASE_URL = import.meta.env.VITE_BASE_URL;


export default {
  data() {
    return {
      image_link: this.image
        ? `${BASE_URL}${this.image}`
        : "/src/assets/noImage.png",
    };
  },
  props: {
    image: String,
    title: String,
    date: String,
    time: String,
    location: String,
    qrCode: String,
    category: String,
    seatNumber: String
  },
  components: {
    IconDate,
    IconTime,
    IconLocation,
    QrCode,
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
