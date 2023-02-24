<script>
    import { CONSTANTS } from "../constants/constants";
    import { goto } from '@sapper/app';
    const naviagte = () =>{
        goto('/')
    }
    const toggle = () =>{
        window.document.body.classList.toggle('dark');
    }
</script>

<div class="header">
    <div class="icon" on:mousedown={naviagte}>
        <img src="../images/icon.png" alt="" srcset="">
        {CONSTANTS.HEADER.HEADING}
    </div>
    <div class="toggler">
        <span>{CONSTANTS.HEADER.LIGHT_THEME}</span>
        <input on:click={toggle} checked type="checkbox" id="switch" /><label for="switch"></label>
        <span>{CONSTANTS.HEADER.DARK_THEME}</span>
    </div>
    
</div>

<style lang="scss">
.header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-color);
    .icon{
        width: 15rem;
        height: 5rem;
        display: flex;
        align-items: center;
        font-size: 2rem;
        cursor: pointer;
        color: var(--primary-bg-text-color);
        img{
            height: 100%;
        }
    }
    .toggler{
        display: flex;
        align-items: center;
        margin: 1.5rem;
        span{
            color: var(--primary-bg-text-color);
        }
        input[type=checkbox]{
            height: 0;
            width: 0;
            visibility: hidden;
        }

        label {
            cursor: pointer;
            margin: 0 0.5rem;
            width: 50px;
            height: 5px;
            background: var(--primary-bg-text-color);
            display: block;
            border-radius: 100px;
            position: relative;
            &:after{
                content: "";
                position: absolute;
                top: -5px;
                left: 5px;
                width: 15px;
                height: 15px;
                background: var(--dark-toggler);
                border-radius: 90px;
                transition: 0.3s;
            }
        }

        input:checked + label:after {
            left: calc(100% - 5px);
            transform: translateX(-100%);
        }
    }
    
}
</style>