<template>
  <div class="inscripted-events">
    <EventsView eventType="inscripted" />
  </div>
</template>

<script>
import EventsView from "@/components/EventsView";

export default {
  name: "InscriptedEvents",
  components: {
    EventsView,
  }
};
</script>