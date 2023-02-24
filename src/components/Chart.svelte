<script>
    // import { Line } from 'svelte-chartjs';
    import { data } from '../utils/ChartData';
  
    import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      LineElement,
      LinearScale,
      PointElement,
      CategoryScale,
    } from 'chart.js';
  
    ChartJS.register(
      Title,
      Tooltip,
      Legend,
      LineElement,
      LinearScale,
      PointElement,
      CategoryScale
    );
  </script>
  
<div class="chart">
  <!-- <Line {data} options={{ responsive: true, maintainAspectRatio: false  }} /> -->
</div>
  
<style lang="scss">
.chart{
  background-color: var(--flight-card-bg);
}
</style>

  