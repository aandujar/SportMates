<template>
  <div class="owned-events">
    <EventsView eventType="owned" />
  </div>
</template>

<script>
import EventsView from "@/components/EventsView";

export default {
  name: "OwnedEvents",
  components: {
    EventsView
  }
};
</script>