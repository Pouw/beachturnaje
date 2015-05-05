<?php

namespace App\Presenters;

use Nette,
	App\Model;


/**
 * Homepage presenter.
 */
class HomepagePresenter extends BasePresenter
{
    /** @var Nette\Database\Context */
    private $database;

    public function __construct(Nette\Database\Context $database)
    {
        $this->database = $database;
    }

	public function renderDefault()
	{
        $this->template->events = $this->database->table('event')
            ->order('start_time DESC')
            ->limit(5);
		$this->template->anyVariable = 'any value';
	}

}
