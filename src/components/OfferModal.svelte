<script>
    import { CONSTANTS } from "../constants/constants"
    import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}
</script>


<div class="modal">
    <div class="cross" on:mousedown={close}><ion-icon name="close-outline"></ion-icon></div>
    <div class="title">{CONSTANTS.OFFER_MODAL.TITLE}</div>
    <div class="content">{CONSTANTS.OFFER_MODAL.CONTENT}</div>
</div>


<style lang="scss">
    .modal{
        margin-top: 2rem;
        padding: 1rem;
        background-color: var(--offer-card-bg);
        color: var(--text-color);
        .cross{
            text-align: right;
            cursor: pointer;
        }
        .title{
            font-size: 1.2rem;
            font-weight: 500;
        }
        .content{
            margin-top: 2rem;
            font-size: 1rem;
        }
    }
</style>