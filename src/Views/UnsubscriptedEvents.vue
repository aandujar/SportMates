<template>
  <div class="unscuscripted-events">
    <EventsView eventType="unsubscripted" />
  </div>
</template>

<script>
import EventsView from "@/components/EventsView";

export default {
  name: "UnsubscriptedEvents",
  components: {
    EventsView,
  }
};
</script>