const BilletListComponent = (isSame, otherUser, suspendedBillet, billets, Billet) => {
	return (<div className='container card row'>
		<h1>{isSame ? "Your blog and billet(s)" : `Blog of ${otherUser} and his/her billet(s)`}</h1>
		<small>{(isSame) ? suspendedBillet > 0 ? (<div className='alert-error mt-1 font-size-md font-weight-600'>{`You have ${suspendedBillet} `} {suspendedBillet > 1 ? "suspended billets!" : "suspended billet!"}</div>) : (<div className='alert-success mt-1 font-size-md font-weight-600'><p>You don't have any suspended billets, welldone!</p></div>) : "Here you are pleased to choose a billet onwich you can comments!"}</small>
		<ul>
			{billets.map(billet => (
				<Billet key={billet.id} {...billet} />
			))}
		</ul>
		<a href={`/profile`} className='btn-gray mt-2 ml-1 mb-1'>Go back to your proflie</a>
	</div>);
}

export default BilletListComponent;