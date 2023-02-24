<script>
    export let date;
    export let label;
    export let disable=false;
    let className='';
    date !=""?className = "move-up":className='';
    function labelToogle()
    {
        if(date !='')return
        className == ""?className = "move-up":className='';
    }
    function setValue() {
        date !=""?className = "move-up":className='';
    }
</script>

<label class="calendar">
    <span class={className} for="calendar">{label}</span>
    <input type="date" bind:value={date} name="calendar" disabled={disable} required on:focus={labelToogle} on:change={setValue} on:blur={labelToogle} placeholder=" " />
</label>

<style lang="scss">
    .calendar{
        position: relative;
        span{
            position: absolute;
            color: var(--calendar-font);     
            top:-5px;
            left: 2rem;
            font-size: 1.2rem;
            transition: all 0.2s ease;
        }
        input[type=date]:required:invalid::-webkit-datetime-edit{
            color: transparent;
        }
        input[type=date]:required:disabled::-webkit-datetime-edit {
            color: transparent;
        }
        input[type=date]:focus::-webkit-datetime-edit,
        input::-webkit-datetime-edit-year-field:focus,
        input::-webkit-datetime-edit-month-field:focus,
        input::-webkit-datetime-edit-day-field:focus,
        input::-webkit-calendar-picker-indicator  {
            color:var(--calendar-font) !important;
        }
        input{
            color: var(--calendar-font);
            background-color: var(--calendar-bg);
            height: 5rem;
            border-radius: 5px;
            padding: 0 1.5rem;
            font-size: 1.2rem;
            border: 0;
            width: 100% ;
            outline: none;
            -webkit-appearance: none;
            -moz-appearance: none;
        }
        span.move-up{
            left:2rem;
            top: -1.5rem;
            font-size: 0.75rem;
        }
        input:disabled{
            opacity: 0.5;
        }
    }
</style>