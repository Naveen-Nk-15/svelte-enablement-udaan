<script>
    import { createEventDispatcher } from "svelte";
    import { CONSTANTS } from "../constants/constants";
    export let airlines = "";
    export let flightIcon = "";
    const dispatch = createEventDispatcher();
    function modalClose()
    {
        dispatch("closeModal");
    }
</script>

<div class="modal-backdrop" on:mousedown={modalClose}></div>
<div class="modal">
    <div class="cross" on:mousedown={modalClose}><ion-icon name="close-outline"></ion-icon></div>
    <div class="title">
        {CONSTANTS.CONFIRM_MODAL.TITLE}
    </div>
    <div class="content">
        <div class="airlines">
            <div class="flight-info">
                <ion-icon name="airplane-outline"></ion-icon>
                <img src={flightIcon} alt="">
                <div class="flight-name">{airlines}</div>
            </div>
        </div>
        <span>{airlines}</span> {CONSTANTS.CONFIRM_MODAL.CONTENT}
    </div>
</div>

<style lang="scss">
    .modal{
        position: absolute;
        z-index: 2;
        width: 30%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2rem;
        background-color: var(--flight-card-bg);
        .cross{
            text-align: right;
            cursor: pointer;
        }
        .title{
            font-size: 1.5rem;
            font-weight: 500;
        }
        .content{
            margin-top: 2rem;
            .airlines{
                .flight-info{
                    display: flex;
                    align-items: center;
                    column-gap: 1rem;
                    img{
                        height: 2rem;
                        width: 2rem;
                    }
                }
            }
            span{
                font-weight: 500;
                font-size: 1.2rem;
            }
        }
    }
    .modal-backdrop{
        position: fixed; 
        z-index: 1; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgba(0,0,0,0.2); 
    }
</style>